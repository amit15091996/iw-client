import { postReqAxios } from "../../axiosConfig/PostReq";

export const getAllUsers=async (type)=>{
    console.log(`/admin/users?type=${type}`);
    return await postReqAxios.get(`/admin/users?type=${type}`).then(res=>res=res.data);
 }