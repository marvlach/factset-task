import { NavLink } from 'react-router-dom';
import { useSelector} from 'react-redux';
import styles from './MainHeader.module.css';
import Button from '../../UI/Button/Button';

const MainHeader = (props) => {
    const user = useSelector(store => store.user);

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
            label: user.user.username,
        },
        {
            key: '/logout',
            label: <Button> Logout </Button>,
        },
    ]; 

    const navItems = user?.isAuth ? 
        loggedInMenuItems.map(item => {
            return <li key={item.key}>{item.label}</li>
            
        }) : 
        notLoggedInMenuItems.map(item => {
            return <li key={item.key}>{item.label}</li>
            
        })
        console.log(user)
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