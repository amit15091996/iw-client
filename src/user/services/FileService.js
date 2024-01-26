import axios from "axios";
import { BASE_URL, postReqAxios } from "../../axiosConfig/PostReq";
import { getToken } from "./UserService";


// upload functionality for Admin----------------
export const uploadFileAdmin = async (fileData) => {
    try {
        // Assuming fileData contains the file object
        const formData = new FormData();
        formData.append('files', fileData?.file);
        formData.append('fileType', fileData?.fileType)
        formData.append('fileDescription', fileData?.text)
        formData.append('reportDate', fileData?.uploadDateTime)
        //  // Assuming 'file' is the key expected by the backend for the file data


        //  console.log(formData);
        const token = getToken();
        const response = axios({
            method: "post",
            url: `${BASE_URL}/user/upload-file`,
            data: formData,
            headers: { "Content-Type": 'multipart/form-data', 'Authorization': 'Bearer ' + token },
        })

        console.log(response.data);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
}


export const getAdminFile = async (fileId) => {
    try {
        const resposne = await postReqAxios.get(`/admin/get-file/${fileId}`);
        console.log(resposne.data);
        return resposne.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
}

// ------------------------- upload functionality for USER ----------------
export const uploadFileUser = async (fileData) => {
    try {
        const response = await postReqAxios.post(`/user/upload-file`, fileData);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
}

export const getUserFile = async (fileId) => {
    try {
        const resposne = await postReqAxios.get(`/user/get-file/${fileId}`);
        console.log(resposne.data);
        return resposne.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
}


export const getFileDetailByUserId = async () => {
    try {
        const response = await postReqAxios.get('/user/get-file-transdetail-by-userid', {
            params: {
                pageNo: 0,
                pageSize: 5,
                sortBy: 'fileTransDetailsId',
                sortingOrder: 'DSC',
            },
        });
        console.log("getFileDetailByUserId : ", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Propagate the error if needed
    }
};

export default getFileDetailByUserId;


// get all user-file-details * Admin

export const getAllFileDetail = async (pageNo, pageSize) => {
    try {
        const response = await postReqAxios.get(`/admin/get-all-filetransdetail`, {
            params: {
                pageNo,
                pageSize,
                sortBy: 'fileTransDetailsId',
                sortingOrder: 'DSC',
            },
        });
        console.log("All Files Details -  ", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Propagate the error if needed
    }
}

// get-Filetransdetail-By-Year-And-UserId 

export const getFileDetailByUserIdAndYear = async (userId, year, pageNo, pageSize, sortBy = 'reportDate', sortingOrder = 'ASC') => {
    try {
        const response = await postReqAxios.get('/admin/get-filetransdetail-by-year-and-userid', {
            params: {
                userId,
                year,
                pageNo,     // Include the pageNo parameter
                pageSize,   // Include the pageSize parameter
                sortBy,
                sortingOrder,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching file details:', error);
        throw error; // Propagate the error if needed
    }
};



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