export interface IRegisterProps {
    onSubmit: (data: IRegisterData) => void;
}

export interface IRegisterData {
    email: string;
    password: string;
}