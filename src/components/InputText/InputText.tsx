import React from "react";
import { InputTextStyle } from "./InputText.style";

export interface InputProps {
    placeholder: string;
    inputColor: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputText: React.FC<InputProps>  = ({ placeholder, inputColor, value, onChange, onKeyPress }) => (
    <InputTextStyle 
        placeholder={placeholder} inputColor={inputColor} value={value} onChange={onChange} onKeyPress={onKeyPress}
    />
);

export default InputText;