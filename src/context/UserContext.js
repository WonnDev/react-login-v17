import React from "react";

const UserContext = React.createContext({email: '', auth: false});

//Provider
const UserProvider = ({ children }) => {
    const [user, setUser] =  React.useState({email: '', auth: false});

    const loginContext = (email, token) => {
        setUser((user) => ({
                email: email,
                auth: true,
        }));
        localStorage.setItem("token", token);
        localStorage.setItem("email", email); //not necessary but this is a bug of project for reloadpage, unsave data login
        //one bug is reload at the firsttime pageload
    };
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        setUser((user) => ({
            email: '',
            auth: false,
        }));
    };

    return (
        <UserContext.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };