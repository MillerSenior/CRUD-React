import React from 'react';
import Navbar from './components/NavBar';

const Layout = ({ children, categoriesExist }) => {
    return (
        <div>
            <Navbar categoriesExist={categoriesExist} />
            {children}
        </div>
    );
};

export default Layout;