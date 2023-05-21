import axios from "axios";
axios.defaults.withCredentials = true;

const reviewApi = `${process.env.REACT_APP_API_URL}/review`;

const getReviews = async (gameId) => {
  try {
    const res = await axios.get(`${reviewApi}/${gameId}`);
    return res.data;
  } catch (err) {
    console.log('getReviews', err);
  }
};

const likeGame = async (gameId) => {
  try {
    const res = await axios.post(`${reviewApi}/${gameId}?like=true`);
    return res.data;
  } catch (err) {
    console.log('likeGame', err);
  }
};

const dislikeGame = async (gameId) => {
  try {
    const res = await axios.post(`${reviewApi}/${gameId}?like=false`);
    return res.data;
  } catch (err) {
    console.log('dislikeGame', err);
  }
};

const unLikeGame = async (gameId) => {
  try {
    const res = await axios.post(`${reviewApi}/${gameId}?like=null`);
    return res.data;
  } catch (err) {
    console.log('unLikeGame', err);
  }
};

export {
  getReviews,
  likeGame,
  dislikeGame,
  unLikeGame
};
