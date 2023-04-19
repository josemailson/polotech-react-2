import ButtonListView from "components/ButtonListView/ButtonListView";
import Header from "components/Header/Header";
import InputText from "components/InputText/InputText";
import Spacer from "components/Spacer/Spacer";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ListContainer, TodoListContainer } from "screens/ListView/ListView.style";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from "services/firebaseConfig";


const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();
  
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  function handleSignUp(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    createUserWithEmailAndPassword(email, password);
    setTimeout(() => {
      history("/");
    }, 1000);
  }  

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };


  return (
    <ListContainer>
      <Header title={"To Do App"} color={"#ffffff"} as="h1" />
      <Header title={"Criar conta"} color={"#ffffff"} as="h2" />
      <TodoListContainer>
        <InputText type={"email"} placeholder={"E-mail"} inputColor={"#ffffff"} onChange={handleEmailChange} value={email} />
        <Spacer height="0.8rem" />
        <InputText type={"password"} placeholder={"Senha"} inputColor={"#ffffff"} onChange={handlePasswordChange} value={password} />
        <Spacer height="1.2rem" />
        <ButtonListView 
            title={loading ? "Carregando..." : "Criar conta"} 
            color={"#81749c"} 
            width={"auto"} 
            height={"1.8rem"} 
            disabled={loading} 
            onClick={handleSignUp}
        />
        <Spacer width="auto" height="0.8rem" />
        <Link to="/">
          <ButtonListView title={"Já possui conta? Faça login"} color={"#81749c"} width={"97%"} height={"1.8rem"} disabled={loading} />
        </Link>
      </TodoListContainer>
    </ListContainer>
  );
};

export default Register;