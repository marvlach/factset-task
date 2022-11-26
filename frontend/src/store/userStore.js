import { createContext, useState } from "react";

const CartContext = createContext({
    user: {},
    handleLogin: () => {},
    handleLogout: () => {}
})


export const UserContextProvider = (props) => {

    const [user, setUser] = useState({
        isLoggedIn: false,
        isAdmin: false,
        username: '',
        accessToken: ''
    });

    

    const handleLogin = (email, password) => {

    }

    const handleLogout = () => {

    }

    return(
        <CartContext.Provider
            value={{
                user: user,
                handleLogin: handleLogin,
                handleLogout: handleLogout
            }}
        >
            {props.children}
        </CartContext.Provider>
    );
}

export default CartContext