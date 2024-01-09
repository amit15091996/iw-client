import axios from "axios";
import { postReqAxios } from "../../axiosConfig/PostReq";
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
            url: "http://localhost:9190/api/v1/admin/upload-file",
            data: formData,
            headers: { "Content-Type": 'multipart/form-data', 'Authorization': 'Bearer ' + token },
        })

        // const response = await postReqAxios.post(`/admin/upload-file`,fileData,{
        //     headers: {
        //         'Content-Type': 'multipart/form-data', // Ensure correct content type for file upload
        //     },
        // });
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