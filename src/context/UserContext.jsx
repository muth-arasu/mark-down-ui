import React, { createContext, useEffect, useState } from 'react';
import AxiosService from '../common/AxiosService';
export const UserContext = createContext()
const UserDataProvider = ({ children }) => {
    const [userData, setUserData] = useState([])
    useEffect(() => {
        getAllUsers();
      }, []);
    
      const getAllUsers = async () => {
        try {
          const response = await AxiosService.get('/');
          setUserData(response.data.allUserData);
          console.log(userData)
        } catch (error) {
          toast.error(error.response.data.error)
          navigate('/sign-in')
        }
      };
    return (<>
        <UserContext.Provider value={{ userData, setUserData }} >
            {children}
        </UserContext.Provider>
    </>)
}
export default UserDataProvider