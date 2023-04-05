import React from "react";

export interface IListViewProps {
    listNumbers: number[];
}

const ListView = ({ listNumbers }: IListViewProps) => {

    return <ul>{listNumbers.map((number) => <li key={number}>{number}</li>)}</ul>;
};

export default ListView;