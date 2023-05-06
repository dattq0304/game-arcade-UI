import axios from "axios";

const baseURL = 'http://localhost:3001/api/user';

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
};