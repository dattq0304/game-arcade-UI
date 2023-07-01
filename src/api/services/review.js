import axios from "axios";
axios.defaults.withCredentials = true;

const reviewApi = `${process.env.REACT_APP_API_URL}/review`;

const getReviews = async ({ gameId }) => {
  try {
    const res = await axios.get(`${reviewApi}/${gameId}`);
    return res.data;
  } catch (err) {
    console.log('getReviews', err);
  }
};

const postReview = async ({ gameId, star, content }) => {
  try {
    const formData = new FormData();
    formData.append('content', content);
    formData.append('star', star);
    const urlencoded = new URLSearchParams(formData).toString();
    const res = await axios.post(`${reviewApi}/${gameId}`, urlencoded,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return res.data;
  } catch (err) {
    console.log('postReview', err);
    throw err;
  }
};

const deleteReview = async ({ gameId }) => {
  try {
    const res = await axios.delete(`${reviewApi}/${gameId}`);
    return res.data;
  } catch (err) {
    console.log('deleteReview', err);
  }
};

export {
  getReviews,
  postReview,
  deleteReview
};
