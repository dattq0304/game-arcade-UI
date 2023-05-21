import { createContext, useState, useEffect } from 'react';
import { Cookies } from 'react-cookie';
import axios from 'axios';

const UserContext = createContext(null);
const userApi = process.env.REACT_APP_API_URL + '/user';

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const cookies = new Cookies();

  useEffect(() => {
    const getUserId = async () => {
      try {
        const res = await axios.get(`${userApi}/auth`, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        if (res.status === 200) {
          return res.data;
        }

      } catch (err) {
        console.error('getUserId', err);
        return null;
      }
    };

    const getUser = async (id) => {
      try {
        const res = await axios.get(`${userApi}/?id=${id}`);
        res.data.profile_image = `${userApi}/image/${res.data.profile_image}`;
        console.log(res.data);
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
