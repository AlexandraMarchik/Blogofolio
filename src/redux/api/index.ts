import {create} from "apisauce";
import {ActivateUserData, SignUpUserPayload, UserPayloadData} from "../reducers/@types";

const API = create({
    baseURL: "https://studapi.teachmeskills.by",
})
const getPosts = ()=>{
    return API.get("/blog/posts/?limit=12")
}
const getSinglePost = (id:string)=>{
    return API.get(`/blog/posts/${id}/`)
}
const signUpUser = (data: UserPayloadData) => {
    return API.post("/auth/users/", data);
};
const activateUser = (data: ActivateUserData) => {
    return API.post("/auth/users/activation/", data);
};




export default {
    getPosts,
    getSinglePost,
    signUpUser,
    activateUser
    };