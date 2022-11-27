import { Navigate, Outlet, useLocation, } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'; 
import { useLazyGetUserQuery } from '../api/userApiSlice';
import { useEffect } from 'react';
import { userActions } from '../store/userSlice';
import Spinner from '../components/UI/Spinner/Spinner.js';

const ProtectedRoute = ({ children, }) => {
    const user = useSelector(store => store.user)
    const location = useLocation();
    const [getUser, {isLoading: getUserIsLoading, isError: getUserError }] = useLazyGetUserQuery();
    const dispatch = useDispatch();

    useEffect(() => {

        const fetchUser = async () => {
            try {
                const response = await getUser().unwrap();
                dispatch(userActions.setUser({user: response}))
            } catch (error) {
                console.log('error', error)
            }
        }

        if (!user.isAuth) {
            fetchUser();
        }
        
    }, [user.isAuth, dispatch, getUser])

    if (user.isAuth) {
      	return children ? children : <Outlet />;
    }
    console.log(getUserError)
    return ( 
        <>
            {getUserError && <Navigate to='/login' replace={true} state={{from: location, unathorized: true}}/>}
            {getUserIsLoading && <Spinner />}
        </>
    );
    
};

export default ProtectedRoute