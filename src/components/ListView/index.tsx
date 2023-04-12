import React from "react";
import List from "./ListView.style"

export interface IListViewProps {
    listNumbers: number[];
}

const ListView = ({ listNumbers }: IListViewProps) => {

    return <List className="list">{listNumbers.map((number) => <li key={number}>{number}</li>)}</List>;
};

export default ListView;