import axios from "axios";
// import { postReqAxios } from "../../axiosConfig/PostReq";
import { getToken } from "./UserService";
import { BASE_URL, postReqAxios } from "../../axiosConfig/PostReq";

export const createBlog = async (blogData) => {
    try {
        const formData = new FormData();
        formData.append('blogTitle', blogData.blogTitle);
        formData.append('blogDesc1', blogData.blogDesc1);
        formData.append('blogImage', blogData.blogImage);

        const token = getToken();
        const response = await axios.post('http://192.168.1.6:9190/api/v1/blog/create-blog', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token,
            },
        });

        const createdBlog = response.data;
        console.log('createdBlog:', createdBlog);

        if (!createdBlog) {
            console.error('Error: Backend response does not contain created blog data');
        }

        return createdBlog;
    } catch (error) {
        console.error('Error creating blog:', error);
        throw error;
    }
};


export const getBlogs = async (type, pageNo, pageSize) => {
    try {
        const response = await postReqAxios.get(`/blog/blogs?sortBy=blogUploadedOn&sortingOrder=DSC`, {
            params: {
                type: type,
                pageNo: pageNo,
                pageSize: pageSize,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching blogs:', error);
        throw error;
    }
};

export const updateBlog = async (blogData) => {
    try {
        const formData = new FormData();
        formData.append('blogId', blogData.blogId);
        formData.append('blogTitle', blogData.blogTitle);
        formData.append('blogDesc1', blogData.blogDesc1);

        // Check if blogImage is provided before appending to FormData
        if (blogData.blogImage) {
            formData.append('blogImage', blogData.blogImage);
        }

        const token = getToken();
        const response = await axios({
            method: 'put',
            url: `${BASE_URL}/blog/update-blog`,
            data: formData,
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        });

        if (response.status >= 200 && response.status < 300) {
            const updatedBlog = response.data;
            console.log('updatedBlog:', updatedBlog);

            if (!updatedBlog) {
                console.error('Error: Backend response does not contain updated blog data');
            }

            return updatedBlog;
        } else {
            console.error('Error updating blog. Server returned:', response.status, response.statusText);
            throw new Error('Failed to update blog. Check the server response for details.');
        }
    } catch (error) {
        console.error('Error updating blog:', error);
        throw error;
    }
};


export const deleteBlog = async (blogId) => {
    try {
        const token = getToken();
        const response = await axios({
            method: "delete",
            url: `http://localhost:9190/api/v1/blog/delete-blog/${blogId}`,
            headers: { "Authorization": 'Bearer ' + token },
        });

        // Check if the response status is within the successful range
        if (response.status >= 200 && response.status < 300) {
            const deletionResult = response.data;
            return deletionResult;
        } else {
            // Handle unexpected status codes or server errors
            console.error('Unexpected response:', response);
            throw new Error(`Unexpected response: ${response.status}`);
        }
    } catch (error) {
        console.error('Error deleting blog:', error);
        throw error;
    }
};
