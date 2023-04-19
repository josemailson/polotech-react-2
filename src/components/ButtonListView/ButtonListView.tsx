import React from "react";
import ButtonList from "./ButtonListView.style";

export interface IButtonListViewProps {
  title: string;
  color: string;
  height: string;
  width: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void | ( (email: string, password: string) => void)
  disabled: boolean;
}

const ButtonListView = ({ title, color, height, width, onClick, disabled }: IButtonListViewProps) => {

  return (
    <ButtonList className="button-list" type="button" title={title} color={color} height={height} width={width} onClick={onClick} disabled={disabled}>
      {title}
    </ButtonList>
  );
};

export default ButtonListView;
