import { createContext, useState, useEffect } from 'react';
import { Cookies } from 'react-cookie';
import axios from 'axios';

const UserContext = createContext(null);

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const cookies = new Cookies();

  useEffect(() => {
    const getUserId = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/user/auth', {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        if (res.status === 200) {
          return res.data;
        }
        console.log('getUserId', res);
      } catch (err) {
        console.error('getUserId', err);
        return null;
      }
    };

    const getUser = async (id) => {
      try {
        const res = await axios.get(`http://localhost:3001/api/user/?id=${id}`);
        return res.data;
      } catch (err) {
        return null;
      }
    }

    const checkUser = async () => {
      if (cookies.get('token') !== undefined) {
        const userId = await getUserId();
        if (userId) {
          const user = await getUser(userId);
          setUser(user);
          console.log(user);
        }
      }
    }
    checkUser();
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
