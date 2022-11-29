import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import styles from './MainHeader.module.css';
import { useLogoutMutation } from '../../../api/userApiSlice';
import { userActions } from '../../../store/userSlice';

const MainHeader = () => {
    const user = useSelector(store => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const activeStyle = {
        textDecoration: "underline",
    };
    const [logout, { isLoading, error }] = useLogoutMutation();

    const handleLogout = async () => {
        console.log('hello')
        try {
            await logout();
            dispatch(userActions.logout());
            navigate("/login");        
        } catch (error) {
            console.log('error', error)
        }
        
    }

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
            label: <NavLink to='/currency' style={({ isActive }) => isActive ? activeStyle : undefined }> {user?.user?.username} </NavLink>
        },
        {
            key: '/logout',
            label: <button onClick={handleLogout}> Logout </button>,
        },
    ]; 

    const navItems = user?.isAuth ? 
    loggedInMenuItems.map(item => <li key={item.key}>{item.label}</li>) : 
    notLoggedInMenuItems.map(item => <li key={item.key}>{item.label}</li>)

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