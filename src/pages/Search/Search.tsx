import React from "react";
import { useSelector } from "react-redux";

import Title from "src/components/Title";
import { PostSelectors } from "src/redux/reducers/postSlice";
import SearchCardList from "src/components/SearchCardList/SearchCardList";


const Search = () => {
    const searchValue = useSelector(PostSelectors.getSearchValue);
    const cardList = useSelector(PostSelectors.getSearchedPosts);
    return (
        <div>
            <Title title={searchValue} />
            <SearchCardList cardsList={cardList} />
        </div>
    );
};

export default Search;