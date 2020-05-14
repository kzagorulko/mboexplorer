import React from 'react';
import { useApi } from '../../utils';

const Header = () => {
    const { logout, userLoggedIn } = useApi();
    return userLoggedIn ? (<div>
        <button onClick={logout}>Log Out</button>
        <a href={'/'}>Home</a>
    </div>) : null;
};

export default Header;
