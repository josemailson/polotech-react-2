import React from "react";
import ButtonList from "./ButtonListView.style";

export interface IButtonListViewProps {
  title: string;
  color: string;
  onClick?: () => void;
  disabled: boolean;
}

const ButtonListView = ({ title, color, onClick, disabled }: IButtonListViewProps) => {

  return (
    <ButtonList className="button-list" type="button" color={color} onClick={onClick} disabled={disabled}>
      {title}
    </ButtonList>
  );
};

export default ButtonListView;
