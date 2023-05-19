import axios from "axios";
// import { useContext } from "react";

// import { UserContext } from "~/store/userContext";

// const baseURL = 'http://localhost:3001/api/game';
const baseURL = `${process.env.REACT_APP_API_URL}/game`;

// const getGameList = async (category = '', type = '', size = 10) => {
//   try {
//     console.log(category, type, 'size', size)
//     let url = "";
//     if (category.length > 0) {
//       url = `${baseURL}/category/${category}?size=${size}`;
//     } else if (type) {
//       url = `${baseURL}/${type}?size=${size}`;
//     }

//     const res = await axios.get(url);
//     return res.data;
//   } catch (err) {
//     console.error("getGameList - Client", err);
//   }
// };

const getGameByType = async (type = '', size = 10) => {
  try {
    const url = `${baseURL}/${type}?size=${size}`;
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.error("getGameByType", err);
  }
};

const getGameByCategory = async (category = '', size = 10) => {
  try {
    const url = `${baseURL}/category/${category}?size=${size}`;
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.error("getGameByType", err);
  }
};

const getAllGames = async () => {
  try {
    const res = await axios.get(baseURL,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    );

    console.log("getAllGames - Server:", res);
    return res.data;
  } catch (err) {
    console.error("getAllGames - Client", err);
  }
};

const getGameByCreator = async (creatorId) => {
  try {
    const res = await axios.get(`${baseURL}/creator/${creatorId}`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    );

    console.log("getGameByCreator - Server:", res);
    return res.data;
  } catch (err) {
    console.error("getGameByCreator - Client", err);
  }
};

const setGameState = async (id, active) => {
  try {
    const res = await axios.put(`${baseURL}/state/?id=${id}&active=${active ? 'true' : 'false'}`);

    console.log("setGameState - Server:", res);
  }
  catch (err) {
    console.error("setGameState - Client", err);
  }
};

const deleteGame = async (gameId) => {
  try {
    const res = await axios.delete(`${baseURL}/${gameId}`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    );

    console.log("deleteGame - Server:", res);
    return res.data;
  } catch (err) {
    console.error("deleteGame - Client", err);
  }
}

const getGameByName = async (name, size = 10) => {
  try {
    const res = await axios.get(`${baseURL}/search?q=${name}&size=${size}`);
    return res.data;
  } catch (err) {
    console.error("searchGameByName - Client", err);
  }
};

export {
  getGameByType,
  getGameByCategory,
  getAllGames,
  setGameState,
  getGameByCreator,
  deleteGame,
  getGameByName,
};