import React from "react";

export interface IButtonListViewProps {
  title: string;
  color: string;
  onClick?: () => void;
}

const ButtonListView = ({ title, color, onClick }: IButtonListViewProps) => {

  return (
    <button type="button" style={{ backgroundColor: color }} onClick={onClick}>
      {title}
    </button>
  );
};

export default ButtonListView;
