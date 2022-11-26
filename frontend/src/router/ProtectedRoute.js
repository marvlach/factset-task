import { useContext } from 'react';
import { Navigate, Outlet, useLocation, } from 'react-router-dom';
import UserContext from '../store/userStore.js';

// we came here from login. So far we know there is a token in local storage
// this token could be invalid or something. We need to get the user data to 
// proceed with the authentication
const ProtectedRoute = ({ children, }) => {
    const ctx = useContext(UserContext);
    const user = ctx.user;
    const location = useLocation();

    if (!user.isLoggedIn) {
        return <Navigate to='/login' replace={true} state={{from: location}}/>;
    }

    return children ? children : <Outlet />;
  };

export default ProtectedRoute