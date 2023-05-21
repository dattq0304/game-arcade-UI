import axios from "axios";

const userApi = `${process.env.REACT_APP_API_URL}/user`;

const getUser = async (id) => {
  try {
    const res = await axios.get(`${userApi}/?id=${id}`);
    res.data.profile_image = `${userApi}/image/${res.data.profile_image}`;
    return res.data;
  } catch (err) {
    return null;
  }
}

const getUserProfileImage = async (userId) => {
  try {
    const res = await axios.get(`${userApi}/image?id=${userId}`);
    return res.data;
  } catch (err) {
    console.error("getUserProfileImage - Client", err);
  }
};

const getAllUsers = async () => {
  try {
    const res = await axios.get(`${userApi}/all`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    );

    return res.data;
  } catch (err) {
    console.error("getAllUsers - Client", err);
  }
};

const updateUsername = async (userId, newUsername) => {
  try {
    const url = `${userApi}/update/username?id=${userId}`

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
    const url = `${userApi}/update/email?id=${userId}`

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
    const url = `${userApi}/update/password?id=${userId}`

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

const changeUserProfileImage = async (userId, i) => {
  try {
    const formData = new FormData();
    formData.append("profile_image", i);
    const urlencoded = new URLSearchParams(formData).toString();
    const url = `${userApi}/image/${userId}`;
    const res = await axios.put(url, urlencoded,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: true
      }
    );

    return {
      ok: true,
      message: res.data,
    };
  } catch (err) {

  }
};

const signIn = async ({ username, password }) => {
  try {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    const urlencoded = new URLSearchParams(formData).toString();
    const res = await axios.post(
      `${userApi}/login`,
      urlencoded,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return res.data;
  } catch (err) {
    alert("Username or password incorrect!");
    console.error("signIn - Client", err);
  }
};

const signUp = async ({ username, password, email }) => {
  try {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);
    const urlencoded = new URLSearchParams(formData).toString();
    const res = await axios.post(
      `${userApi}/register`,
      urlencoded,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return res.data;
  } catch (err) {
    alert("Username or email already exited!");
    console.error("signIn - Client", err);
  }
};

export {
  updateUsername,
  updateEmail,
  updatePassword,
  getAllUsers,
  getUser,
  getUserProfileImage,
  changeUserProfileImage,
  signIn,
  signUp
};