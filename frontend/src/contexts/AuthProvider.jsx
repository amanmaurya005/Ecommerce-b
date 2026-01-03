import { createContext, useContext, useEffect, useState } from "react";
import instance from "../axiosConfig";

const authContext = createContext();

function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loggedinUser, setLoggedinUser] = useState(null)

     const [users, setUsers] = useState([]);
      const [loading, setLoading] = useState(true);
    
      async function fetchUsers() {
        try {
          const res = await instance.get("/user");
          setUsers(res.data);
        } catch (error) {
          console.error("Failed to load users", error);
        } finally {
          setLoading(false);
        }
      }
      useEffect(() => {
          fetchUsers();
        }, []);

    useEffect(() => {
        checkIsLoggedIn();
    }, []);

    async function checkIsLoggedIn() {
        const response = await instance.get("/check/login?referer=user",
            {
                withCredentials: true,
            });
        if (response.status === 200) setIsLoggedIn(true);
    }

    async function handleLogout() {
        const response = await instance.post("/user/logout", {}, {
            withCredentials: true
        })
        if (response.status === 200) {
            window.location.href = "/";
        }
        setIsLoggedIn(false);
  setCartItems([]);
    }

    return (
        <authContext.Provider value={{ isLoggedIn,setIsLoggedIn, loggedinUser, checkIsLoggedIn, handleLogout,users,loading,fetchUsers, }}>
            {children}
        </authContext.Provider>
    )
}

export function useAuth() {
    return useContext(authContext)
}

export default AuthProvider