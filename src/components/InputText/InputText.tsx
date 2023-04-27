import React from "react";
import { InputTextStyle } from "./InputText.style";

export interface InputProps {
    type?: string
    placeholder: string;
    inputColor: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputText: React.FC<InputProps>  = ({ type, placeholder, inputColor, value, onChange, onKeyPress }) => (
    <InputTextStyle 
       type={type} placeholder={placeholder} inputColor={inputColor} value={value} onChange={onChange} onKeyPress={onKeyPress}
    />
);

export default InputText;