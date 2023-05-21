import axios from "axios";

const baseApi = process.env.REACT_APP_API_URL;
const uploadApi = baseApi + "/upload";
const gameApi = baseApi + "/game";

const uploadInfo = async ({ userId, name, category, description, control, type, link = '' }) => {
  try {
    const formData = new FormData();
    formData.append("creator_id", userId);
    formData.append("name", name);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("control", control);
    formData.append("type", type);
    if (type === "Iframe link") {
      formData.append("link", link);
    }
    const res = await axios.post(`${uploadApi}/info`, formData);
    return res.data;
  } catch (err) {
    console.error('uploadInfo', err);
  }
};

const updateInfo = async ({ userId, gameId, name, category, description, control, type, link = '' }) => {
  try {
    const formData = new FormData();
    formData.append("creator_id", userId);
    formData.append("name", name);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("control", control);
    formData.append("type", type);
    if (type === "Iframe link") {
      formData.append("link", link);
    }
    const urlencoded = new URLSearchParams(formData).toString();

    const res = await axios.put(`${gameApi}/update/${gameId}`, urlencoded,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

    return res.data;
  } catch (err) {
    console.error('updateInfo', err);
  }
};

const uploadSourceCode = async ({ zipFile, gameId }) => {
  try {
    const formData = new FormData();
    formData.append("source-code", zipFile);

    const res = await axios.post(
      `${uploadApi}/source-code/${gameId}`,
      formData
    );
    return res.data;
  } catch (err) {
    console.error('uploadSourceCode', err);
  }
};

const updateSourceCode = async ({ zipFile, gameId }) => {
  try {
    const formData = new FormData();
    formData.append("source-code", zipFile);

    const res = await axios.put(
      `${gameApi}/source-code/${gameId}`,
      formData
    );
    return res.data;
  } catch (err) {
    console.error('updateSourceCode', err);
  }
};


const uploadCoverImage = async ({ coverImage, gameId }) => {
  try {
    const formData = new FormData();
    formData.append("cover-image", coverImage);

    const res = await axios.post(
      `${uploadApi}/cover-image/${gameId}`,
      formData
    );
    return res.data;
  } catch (err) {
    console.error("uploadCoverImage - Client", err);
  }
};

const updateCoverImage = async ({ coverImage, gameId }) => {
  try {
    const formData = new FormData();
    formData.append("cover-image", coverImage);

    const res = await axios.put(
      `${gameApi}/cover-image/${gameId}`,
      formData
    );
    return res.data;
  } catch (err) {
    console.error("updateCoverImage - Client", err);
  }
};

export {
  uploadInfo,
  updateInfo,
  uploadSourceCode,
  updateSourceCode,
  uploadCoverImage,
  updateCoverImage
}
