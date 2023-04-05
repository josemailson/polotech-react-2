import React from "react";

export interface IButtonListViewProps {
  title: string;
  color: string;
  onClick?: () => void;
  disabled: boolean;
}

const ButtonListView = ({ title, color, onClick, disabled}: IButtonListViewProps) => {

  return (
    <button type="button" style={{ backgroundColor: color }} onClick={onClick} disabled={disabled}>
      {title}
    </button>
  );
};

export default ButtonListView;
