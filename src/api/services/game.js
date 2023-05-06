import axios from "axios";
// import { useContext } from "react";

// import { UserContext } from "~/store/userContext";

const baseURL = 'http://localhost:3001/api/game';

const getGameList = async (category = '', type = '') => {
  try {
    let url = "";
    if (category.length > 0) {
      url = `${baseURL}/category/${category}`;
    } else if (type) {
      url = `${baseURL}/${type}`;
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

const setGameState = async (id, active) => {
  try {
    const res = await axios.put(`${baseURL}/state/?id=${id}&active=${active ? 'true' : 'false'}`);

    console.log("setGameState - Server:", res);
  }
  catch (err) {
    console.error("setGameState - Client", err);
  }
};

export {
  getGameList,
  getAllGames,
  setGameState,
};