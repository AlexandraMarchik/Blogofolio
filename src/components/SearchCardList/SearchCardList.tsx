import React, { FC } from "react";

import { CardListType, CardSize } from "src/utils/@globalTypes";
import Card from "src/components/Card";
import EmptyState from "src/components/EmptyState";
import styles from "./SearchCardList.module.scss";

type SearchCardListProps = {
    cardsList: CardListType;
};
const SearchCardList: FC<SearchCardListProps> = ({ cardsList }) => {
    return cardsList.length > 0 ? (
        <div className={styles.container}>
            {cardsList.map((item, index) => {
                return <Card key={item.id} card={item} size={CardSize.Search} />;
            })}
        </div>
    ) : (
        <EmptyState
            title="Sorry, there's no posts"
            description="Try to use another search request"
        />
    );
};
export default SearchCardList;