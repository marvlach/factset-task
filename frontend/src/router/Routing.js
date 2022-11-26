import { Routes, Route, } from 'react-router-dom'
import Homepage from '../pages/Homepage/Homepage.js'
import Login from '../pages/Login/Login.js'
import NotFound from '../pages/NotFound/NotFound.js'
import Signup from '../pages/Signup/Signup.js'

const Routing = () => {
    return (  
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} /> 
            {/* 
            <Route element={<ProtectedRoute />}>
                <Route path="/users" element={<Users />} />
                <Route path="/users/:userId" element={<UserProfile />} />
                <Route path="/users/:userId/edit" element={<EditUser />} />
                <Route path="/users/add" element={<AddUsers />} />
            </Route>*/}
            <Route path="*" element={<NotFound />} />
        </Routes>
            
    )
}

export default Routing