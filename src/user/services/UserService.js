import { postReqAxios } from "../../axiosConfig/PostReq";
import { getFromLocalStorage, saveInLocalStorage } from "./Util";

export const isUserLoggedIn = () => {
  let tokenString = localStorage.getItem("userInfo");
  if (tokenString) {
    return true;
  } else {
    return false;
  }
};

export const doLoginUser = async (username, password) => {
  const loginReq = {
    username,
    password,
  };
  let data = null;
  const res = await postReqAxios
    .post(`/auth/login`, loginReq)
    .then((result) => {
      console.log(result.data);
      data = result.data;
      if (data) {
        saveInLocalStorage("userInfo", JSON.stringify(data));
        console.log(data);
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
  return res;
};

export const getLoggedInUser = () => {
  if (isUserLoggedIn()) {
    const userInfo = getFromLocalStorage("userInfo");
    return userInfo ? JSON.parse(userInfo) : "";
  }
};

export const getLoggedInUserName = () => {
  const user = getLoggedInUser();
  return user ? user.userName : "";
};
export const getToken = () => {
  const user = getLoggedInUser();
  return user ? user.token : "";
};

export const getUserByUsername = async (username) => {
  return await postReqAxios
    .get(`/user/${username}`)
    .then((res) => (res = res.data));
};

export const registerUser = async (user) => {
  try {
    const response = await postReqAxios.post(`/auth/register`, user);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
};

export const getUserCount = async (count) => {
  const response = await postReqAxios.get(``, count);
  console.log(response.data);
  return response.data;
};

export const getItemReceived = async (count) => {
  const resposne = await postReqAxios.get(``, count);
  console.log(resposne.data);
  return resposne.data;
};

// ------ File handles -------
export const updateProfile = async (updateData) => {
  try {
    const response = await postReqAxios.put(`/user/update-profile`, updateData);

    console.log("Response:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);

    throw error;
  }
};

export const getFileDetailByUserIdAndYear = async (
  year,
  pageNo,
  pageSize,
  sortBy
) => {
  try {
    const response = await postReqAxios.get(
      `/user/get-filetransdetail-by-year-and-userid`,
      {
        params: {
          year: year,
          pageNo: pageNo,
          pageSize: pageSize,
          sortBy: sortBy,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// --------------------- forgot password

export const forgotPassword = async (username) => {
  try {
    const response = await postReqAxios.post(
      `/auth/forgot-password/${username}`
    );
    console.log("res ", response);
    const successMessage =
      response.data.message || "Password reset instructions sent successfully";
    return { success: true, message: successMessage };
  } catch (error) {
    console.error(
      "Error in forgotPassword:",
      error.response ? error.response.data : error.message
    );
    const errorMessage = error.response
      ? error.response.data.error
      : "Failed to send password reset instructions";
    return { success: false, message: errorMessage };
  }
};

// --------------------- update password
export const updatePassword = async (changePasswordDto) => {
  try {
    const response = await postReqAxios.post(
      `/user/change-password`,
      changePasswordDto
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An error occurred while changing password.");
    }
  }
};
