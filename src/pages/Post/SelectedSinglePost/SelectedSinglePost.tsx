import React, {useEffect} from "react";
import PostPage from "../PostPage";
import {useDispatch, useSelector} from "react-redux";
import {getSinglePost, PostSelectors} from "../../../redux/reducers/postSlice";
import {useParams} from "react-router-dom";

const SelectedSinglePost=()=>{
    const dispatch = useDispatch();
    const params = useParams();
    const { id } = params;
    const singlePost = useSelector(PostSelectors.getSinglePost);

    useEffect(() => {
        if (id) {
            dispatch(getSinglePost(id));
        }
    }, []);

    return singlePost ? <PostPage post={singlePost} /> : null
}
export default SelectedSinglePost