import React from "react";
import { HeaderStyle } from "./Header.style";

export interface IHeader{
    title: string;
    color: string;
    as: keyof JSX.IntrinsicElements;
};

const Header = ({title, color, as}: IHeader) => {
    return <HeaderStyle title={title} color={color} as={as}>
        {title}
    </HeaderStyle>;
}

export default Header;