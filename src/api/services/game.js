import axios from "axios";
// import { useContext } from "react";

// import { UserContext } from "~/store/userContext";

const baseURL = 'http://localhost:3001/api/game';

const getGameList = async (category = '', type = '', size = 10) => {
  try {
    console.log(category, type, 'size', size)
    let url = "";
    if (category.length > 0) {
      url = `${baseURL}/category/${category}?size=${size}`;
    } else if (type) {
      url = `${baseURL}/${type}?size=${size}`;
    }

    const res = await axios.get(url);

    console.log("getGameList - Server:", res);

    return res.data;
  } catch (err) {
    console.error("getGameList - Client", err);
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

export {
  getGameList,
  getAllGames,
  setGameState,
  getGameByCreator,
  deleteGame,
};