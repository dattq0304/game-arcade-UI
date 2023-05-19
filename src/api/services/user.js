import axios from "axios";

const baseURL = `${process.env.REACT_APP_API_URL}/user`;

const getUser = async (userId) => {
  try {
    const res = await axios.get(`${baseURL}?id=${userId}`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    );

    console.log("getUser - Server:", res);
    return res.data;
  } catch (err) {
    console.error("getUser - Client", err);
  }
};

const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseURL}/all`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    );

    console.log("getAllUsers - Server:", res);
    return res.data;
  } catch (err) {
    console.error("getAllUsers - Client", err);
  }
};

const updateUsername = async (userId, newUsername) => {
  try {
    const url = `${baseURL}/update/username?id=${userId}`

    const formData = new FormData();
    formData.append("newUsername", newUsername);
    const urlencoded = new URLSearchParams(formData).toString();

    const res = await axios.put(url, urlencoded,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("updateUsername - Server:", res);
    return {
      ok: true,
      message: res.data,
    };
  } catch (err) {
    console.error("updateUsername - Client", err);
    return {
      ok: false,
      message: err.response.data,
    };
  }
};

const updateEmail = async (userId, newEmail) => {
  try {
    const url = `${baseURL}/update/email?id=${userId}`

    const formData = new FormData();
    formData.append("newEmail", newEmail);
    const urlencoded = new URLSearchParams(formData).toString();

    const res = await axios.put(url, urlencoded,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("updateEmail - Server:", res);
    return {
      ok: true,
      message: res.data,
    };
  } catch (err) {
    console.error("updateEmail - Client", err);
    return {
      ok: false,
      message: err.response.data,
    };
  }
};

const updatePassword = async (userId, password, newPassword) => {
  try {
    const url = `${baseURL}/update/password?id=${userId}`

    const formData = new FormData();
    formData.append("password", password);
    formData.append("newPassword", newPassword);
    const urlencoded = new URLSearchParams(formData).toString();

    const res = await axios.put(url, urlencoded,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("updatePassword - Server:", res);
    return {
      ok: true,
      message: res.data,
    };
  } catch (err) {
    console.error("updatePassword - Client", err);
    return {
      ok: false,
      message: err.response.data,
    };
  }
};

export {
  updateUsername,
  updateEmail,
  updatePassword,
  getAllUsers,
  getUser,
};