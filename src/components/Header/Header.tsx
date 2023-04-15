import React from "react";
import { HeaderStyle } from "./Header.style";

export interface IHeader{
    title: string;
    color: string;
};

const Header = ({title, color}: IHeader) => {
    return <HeaderStyle title={title} color={color}>
        {title}
    </HeaderStyle>;
}

export default Header;