import React from 'react';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { GlobalStateProvider, Route} from './utils';
import Header from './components/Header';

import './App.css';

import PageServices from './routes/PageServices'
import PageLogin from './routes/PageLogin';
import PageBusinessObject from './routes/PageBusinessObject';

const App = () => (
    <GlobalStateProvider>
        <Router>
            <Header/>
            <Switch>
                <Route path="/login" component={PageLogin} forGuests/>
                <Route path="/mbo/:objectName" component={PageBusinessObject} forUsers/>
                <Route path="/" component={PageServices} forUsers/>
            </Switch>
        </Router>
    </GlobalStateProvider>
);

export default App;
