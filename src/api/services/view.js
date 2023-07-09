import axios from "axios";

const viewApi = `${process.env.REACT_APP_API_URL}/view`;

const getView = async ({ gameId }) => {
  try {
    const res = await axios.get(`${viewApi}/${gameId}`);
    return res.data;
  } catch (err) {
    console.log("getView", err);
  }
};

const addView = async ({ gameId }) => {
  try {
    const res = await axios.post(`${viewApi}/${gameId}`);
    return res.data;
  } catch (err) {
    console.log("addView", err);
  }
};

const getMostView = async () => {
  try {
    const res = await axios.post(`${viewApi}/most`);
    return res.data;
  } catch (err) {
    console.log("getMostView", err);
  }
};

export { getView, addView, getMostView };
