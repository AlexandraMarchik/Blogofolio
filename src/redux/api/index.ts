import {create} from "apisauce";

const API = create({
    baseURL: "https://studapi.teachmeskills.by",
})
const getPosts = ()=>{
    return API.get("/blog/posts/?limit=12")
}
const getSinglePost = (id:string)=>{
    return API.get(`/blog/posts/${id}/`)
}

export default {
    getPosts,
    getSinglePost
    };