import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../../../store/userStore.js';

import styles from './MainHeader.module.css';

const MainHeader = (props) => {
    const ctx = useContext(UserContext);

    const activeStyle = {
        textDecoration: "underline",
    };

    const notLoggedInMenuItems = [
        {
            key: '/',
            label: <NavLink to='/' style={({ isActive }) => isActive ? activeStyle : undefined }> Home </NavLink>,
        },
        {
            key: '/signup',
            label: <NavLink to='/signup' style={({ isActive }) => isActive ? activeStyle : undefined }> Sign Up </NavLink>,
        },
        {
            key: '/login',
            label: <NavLink to='/login' style={({ isActive }) => isActive ? activeStyle : undefined }> Login </NavLink>,
        },
    ]; 



    const loggedInMenuItems = [
        {
            key: '/',
            label: <NavLink to='/' style={({ isActive }) => isActive ? activeStyle : undefined }> Home </NavLink>,
        },
        {
            key: '/user',
            label: ctx.user.username,
        },
    ]; 

    const navItems = ctx.user.isLoggedIn ? 
        loggedInMenuItems.map(item => {
            return <li key={item.key}>{item.label}</li>
            
        }) : 
        notLoggedInMenuItems.map(item => {
            return <li key={item.key}>{item.label}</li>
            
        })

    return (
        <header className={styles['main-header']}>
            <h1>Currency Calculator</h1>
            <nav className={styles['nav']}>
                <ul>
                    {navItems}
                </ul>
            </nav>
        </header>
    );
};

export default MainHeader;