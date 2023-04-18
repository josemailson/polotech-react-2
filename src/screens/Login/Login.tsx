import ButtonListView from "components/ButtonListView/ButtonListView";
import Header from "components/Header/Header";
import InputText from "components/InputText/InputText";
import Spacer from "components/Spacer/Spacer";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { ListContainer, TodoListContainer } from "screens/ListView/ListView.style";
import { auth } from "services/firebaseConfig";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  function handleSignUp(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
    setTimeout(() => {
      history("/home");
    }, 1000); // 1000 ms = 1 segundo
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
      <Header title={"Login"} color={"#ffffff"} as="h2" />
      <TodoListContainer>
        <InputText type="email" placeholder={"E-mail"} inputColor={"#ffffff"} onChange={handleEmailChange} value={email} />
        <Spacer height="0.4rem" />
        <InputText type="password" placeholder={"Senha"} inputColor={"#ffffff"} onChange={handlePasswordChange} value={password} />
        <Spacer height="1.2rem" />
        <ButtonListView
          title={loading ? "Carregando..." : "Entrar"}
          color={"#81749c"}
          width={"92%"}
          height={"1.8rem"}
          disabled={loading}
          onClick={handleSignUp}
        />
        <Link to="/register">
          <ButtonListView title={"Não possui conta? Crie agora"} color={"#81749c"} width={"92%"} height={"1.8rem"} disabled={false} />
        </Link>
      </TodoListContainer>
    </ListContainer>
  );
};

export default Login;