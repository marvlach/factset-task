import { Navigate, Outlet, useLocation, } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'; 
import { useLazyGetUserQuery } from '../api/userApiSlice';
import { useEffect } from 'react';
import { userActions } from '../store/userSlice';
import Spinner from '../components/UI/Spinner/Spinner.js';

const InverseProtectedRoute = ({ children, }) => {
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

    // if user.isAuth redirect to dashboard
    if (user.isAuth) { 
      	return <Navigate to='/currency' replace={true} state={{from: location, unathorized: true}}/>;
    }
    //console.log(getUserError)

    if (getUserError) {
        return children ? children : <Outlet />;
    }
    return ( 
        <>
            {getUserIsLoading && <Spinner />}
        </>
    );
    
};

export default InverseProtectedRoute