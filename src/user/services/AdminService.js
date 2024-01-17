import { postReqAxios } from "../../axiosConfig/PostReq";

export const getAllUsers = async (type, pageNo, pageSize, sortBy) => {
  console.log(`/admin/users?type=${type}&pageNo=${pageNo}&pageSize=${pageSize}`);
  return await postReqAxios.get(`/admin/users?type=${type}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`)
    .then(res => res.data);
}

export const isNotActiveUser = async (userId) => {
  console.log(`/admin/block-user/${userId}`);
  return await postReqAxios.post(`/admin/block-user/${userId}`).then(res => res.data)
}

export const isActiveUser = async (userId) => {
  console.log(`/admin/unblock-user/${userId}`);
  return await postReqAxios.post(`/admin/unblock-user/${userId}`).then(res => res.data)
}

export const deleteUser = async (userId) => {
  console.log(`/admin/user/delete/${userId}`);
  return await postReqAxios.delete(`/admin/user/delete/${userId}`).then(res => res.data);
}

export const updateUserProfile = async (updateUserReqDto) => {
  try {
    const response = await postReqAxios.put('admin/user/update-profile', updateUserReqDto);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      throw new Error('Session Expired! Please login and try again.');
    } else {
      throw new Error('An error occurred while updating the profile.');
    }
  }
};

export const getFileDetailByUserIdAndYear = async (userId, year, pageNo, pageSize, sortBy) => {
  try {
    const response = await postReqAxios.get(`/admin/get-filetransdetail-by-year-and-userid`, {
      params: {
        userId: userId,
        year: year,
        pageNo: pageNo,
        pageSize: pageSize,
        sortBy: sortBy
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const getFileDetailByTransId = async (transId) => {
  try {
    const response = await postReqAxios.get(`/admin/get-filedetail-by-transid/${transId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching file details:', error);
    throw new Error('An error occurred while fetching file details.');
  }
};
export const getFile = async (fileId, suggestedFileName) => {
  try {
    const response = await postReqAxios.get(`/admin/get-file/${fileId}`, {
      responseType: 'blob',
    });

    // Generate a filename or use the suggestedFileName if provided
    const fileName = suggestedFileName || 'downloadedFile';

    // Create a download link and trigger the download
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(new Blob([response.data]));
    downloadLink.setAttribute('download', fileName);
    downloadLink.click();

    return { success: true };
  } catch (error) {
    console.error('Error fetching file:', error);
    return { success: false, error: error.message };
  }
};

export const getUploadedFileYears = async () => {
  try {
    const response = await postReqAxios.get(`/admin/get-uploaded-file-years`);
    return response.data;
  } catch (error) {
    console.error('Error fetching file details:', error);
    throw new Error('An error occurred while fetching file details.');
  }
}