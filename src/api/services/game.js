import axios from "axios";
// import { useContext } from "react";

// import { UserContext } from "~/store/userContext";

const baseURL = `${process.env.REACT_APP_API_URL}/game`;

const getGameById = async (id) => {
  try {
    const url = `${baseURL}/${id}`;
    const res = await axios.get(url);
    return res.data;
  }
  catch (err) {
    console.log('getGameById', err);
  }
}

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
  getGameById,
  getGameByType,
  getGameByCategory,
  getAllGames,
  setGameState,
  getGameByCreator,
  deleteGame,
  getGameByName,
};