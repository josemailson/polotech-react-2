import ButtonListView from "components/ButtonListView/ButtonListView";
import Header from "components/Header/Header";
import InputText from "components/InputText/InputText";
import Spacer from "components/Spacer/Spacer";
import { UserContext } from "contexts/UserContext";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ListContainer, TodoListContainer } from "screens/ListView/ListView.style";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userContext = useContext(UserContext);

  const history = useNavigate();

  const handleSignIn = userContext.handleSignIn;
  const user = userContext.user;
  const loading = userContext.loading;
  const error = userContext.error;

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleClickSignIn = (email: string, passowrd: string) => {
    handleSignIn(email, password);
    console.log(user?.user.email);
    setTimeout(() => {
      history("/");
    }, 1000);
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
          title={loading ? "Carregando..." : "Entrar"}
          color={"#81749c"}
          width={"97%"}
          height={"1.8rem"}
          disabled={loading}
          onClick={() => (handleClickSignIn(email, password))}
        />
        <Spacer height="0.8rem" />
        <Link to="/register">
          <ButtonListView title={"Não possui conta? Crie agora"} color={"#81749c"} width={"97%"} height={"1.8rem"} disabled={false} />
        </Link>
      </TodoListContainer>
    </ListContainer>
  );
};

export default Login;