import ButtonListView from "components/ButtonListView/ButtonListView";
import Header from "components/Header/Header";
import InputText from "components/InputText/InputText";
import Spacer from "components/Spacer/Spacer";
import { useTask } from "contexts/UserContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ListContainer, TodoListContainer } from "screens/ListView/ListView.style";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    handleSignIn,
    user,
    loading,
    error,
  } = useTask();

  const history = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleClickSignIn = (email: string, password: string) => {
    handleSignIn(email, password);
    const toastPosition = toast.POSITION.TOP_RIGHT;
    if (user) {
      toast.success("Login realizado com sucesso!", {position: toastPosition});
      setTimeout(() => {
        history("/");
      }, 1000);
    } else {
      toast.error("Usuário ou senha não encontrado", {position: toastPosition});
    }
  }

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  
  return (
    <ListContainer>
      <Header title={"To Do App"} color={"#ffffff"} as="h1" />
      <Header title={"Login"} color={"#ffffff"} as="h2" />
      <TodoListContainer>
        <InputText type="email" placeholder={"E-mail"} inputColor={"#ffffff"} onChange={handleEmailChange} value={email} />
        <Spacer height="0.8rem" />
        <InputText type="password" placeholder={"Senha"} inputColor={"#ffffff"} onChange={handlePasswordChange} value={password} />
        <Spacer height="1.2rem" />
        <ButtonListView
          type={"button"}
          title={loading ? "Carregando..." : "Entrar"}
          color={"#81749c"}
          width={"97%"}
          height={"1.8rem"}
          disabled={loading}
          onClick={() => (handleClickSignIn(email, password))}
        />
        <ToastContainer />
        <Spacer height="0.8rem" />
        <Link to="/register">
          <ButtonListView type={"button"} title={"Não possui conta? Crie agora"} color={"#81749c"} width={"97%"} height={"1.8rem"} disabled={false} />
        </Link>
      </TodoListContainer>
    </ListContainer>
  );
};

export default Login;