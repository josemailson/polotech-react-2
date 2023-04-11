import React from "react";
import "./style.css"

export interface IListViewProps {
    listNumbers: number[];
}

const ListView = ({ listNumbers }: IListViewProps) => {

    return <ul className="list">{listNumbers.map((number) => <li key={number}>{number}</li>)}</ul>;
};

export default ListView;