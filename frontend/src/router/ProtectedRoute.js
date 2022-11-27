import { Navigate, Outlet, useLocation, } from 'react-router-dom';
import {useSelector} from 'react-redux'; 

const ProtectedRoute = ({ children, }) => {
    const user = useSelector(store => store.user)
    const location = useLocation();

    if (user.isAuth) {
      	return children ? children : <Outlet />;
    }

    return <Navigate to='/login' replace={true} state={{from: location}}/>;
    
};

export default ProtectedRoute