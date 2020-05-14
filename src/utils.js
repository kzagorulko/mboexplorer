import React, { useState, createContext, useContext } from 'react';
import axios from 'axios';
import rateLimit from 'axios-rate-limit';
import { Route as DefaultRoute, Redirect } from 'react-router-dom';

axios.defaults.withCredentials = true;
const http = rateLimit(axios.create(), { maxRequests: 6, perMilliseconds: 1000 });
export const GlobalState = createContext({});

const getCookie = (name) => {
    if (typeof window === 'undefined') { return null; }

    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i += 1) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
};

const setCookie = (name, value, days) => {
    if (typeof window === 'undefined') { return; }

    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ''}${expires}; path=/`;
};

export const emptyGlobalState = {
    userHost: '',
    userUsername: '',
    userPassword: '',
};

let initialGlobalState = emptyGlobalState;

if (typeof window !== 'undefined') {
    initialGlobalState = {
        userHost: getCookie('userHost'),
        userUsername: getCookie('userUsername'),
        userPassword: getCookie('userPassword'),
    }
}

export const GlobalStateProvider = ({ children }) => {
    const [globalStateValue, _setGlobalStateValue] = useState(initialGlobalState);

    const setGlobalStateValue = (state) => {
        setCookie('userHost', state.userHost);
        setCookie('userUsername', state.userUsername);
        setCookie('userPassword', state.userPassword);
        _setGlobalStateValue(state);
    };

    return (
        <GlobalState.Provider value={[globalStateValue, setGlobalStateValue]}>
            {children}
        </GlobalState.Provider>
    );
};

export const useApi = () => {
    const [state, setState] = useContext(GlobalState);

    const request = (businessObject, _maxItems) => {

        const maxItems = _maxItems || 200;

        return http({
            method: 'get',
            url: `${state.userHost}/maxrest/rest/mbo/${businessObject}?_format=json` +
                `&_lid=${state.userUsername}&_lpwd=${state.userPassword}&_maxItems=${maxItems}`,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': '*',
            },
            withCredentials: false,
            credentials: "same-origin",
        }).then((response) => response.data);
    };

    const updateGlobalState = (data) => setState({
        ...state,
        ...data,
    });

    const logout = () => setState(emptyGlobalState);

    return {
        logout,
        request,
        userLoggedIn: state.userUsername !== '',
        updateGlobalState,
    }
};

export const Route = ({
    forUsers,
    forGuests,
    path,
    exact,
    component: Component,
    ...rest
}) => {
    const { userLoggedIn } = useApi();

    if (forUsers && !userLoggedIn) {
        return <Redirect to="/login" />;
    }

    if (forGuests && userLoggedIn) {
        return <Redirect to="/" />;
    }

    return (
        <DefaultRoute path={path} exact={exact}>
            <Component {...rest} />
        </DefaultRoute>
    );
};

