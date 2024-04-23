 


import { createContext, useState } from "react";
import { toast } from "react-hot-toast";
export const UserContext = createContext(); 

export default function UserContextProvider(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (user) => {
    setIsAuthenticated(true);
    setUser(user);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  function Errors(error) { 
      console.error(error);
      const errors = error && error.response && error.response.data && error.response.data.errors;
      console.log("errors",errors)
      if (errors !== undefined ) {
        errors.map((m, i) => { 
          toast.error(m); 
        });
      } else {
          if(error && error.data && error.data.message !== undefined){ 
            toast.error(error.data.message);
          } 
      }
  }

  const values = {
    Errors,
    isAuthenticated,
    user,
    login,
    logout
  };

    return <>
        <UserContext.Provider value={values} >
            {props.children}
        </UserContext.Provider>
    </>
}
 