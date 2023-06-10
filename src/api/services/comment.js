import axios from "axios";
axios.defaults.withCredentials = true;

const commentApi = `${process.env.REACT_APP_API_URL}/comment`;

const getComments = async (gameId) => {
  try {
    const res = await axios.get(`${commentApi}/${gameId}`);
    return res.data;
  } catch (err) {
    console.log('getComments', err);
  }
};

const postComment = async ({ gameId, content }) => {
  try {
    const formData = new FormData();
    formData.append("content", content);
    const urlencoded = new URLSearchParams(formData).toString();

    console.log(`${commentApi}/${gameId}`);

    const res = await axios.post(
      `${commentApi}/${gameId}`,
      urlencoded,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return res.data;
  } catch (err) {
    console.log('postComment', err);
  }
};

const deleteComment = async (id) => {
  try {
    const res = await axios.delete(`${commentApi}/${id}`);
    return res.data;
  } catch (err) {
    console.log('deleteComment', err);
  }
};

export {
  getComments,
  postComment,
  deleteComment,
}
