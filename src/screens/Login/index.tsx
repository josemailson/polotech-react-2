import ButtonListView from "components/ButtonListView/ButtonListView";
import Header from "components/Header/Header";
import InputText from "components/InputText/InputText";
import Spacer from "components/Spacer/Spacer";
import { useTask } from "contexts/UserContext";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ListContainer, TodoListContainer } from "screens/ListView/ListView.style";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "services/firebaseConfig";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    setAuthing,
    setShouldFetchTodos,
  } = useTask();

  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const history = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const validateEmail = (email: string): string | undefined => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return 'O e-mail precisa ser válido';
    }
  };

  useEffect(() => {
    const toastPosition = toast.POSITION.TOP_RIGHT;
    if (error) {
      toast.error(error.message, {position: toastPosition});
    } else if (loading) {
      toast.info("Realizando login...", {position: toastPosition});
    } else if (user) {
      toast.success("Login realizado com sucesso!", {position: toastPosition});
      setAuthing(true);
      setShouldFetchTodos(true);
      setTimeout(() => {
        history("/");
      }, 1000);
    }
  }, [error, loading, user, setAuthing, setShouldFetchTodos, history]);

  const handleClickSignIn = (email: string, password: string) => {
    const emailError = validateEmail(email);
    if(emailError) {
      toast.error(emailError, {position: toast.POSITION.TOP_RIGHT});
      return;
    }
    signInWithEmailAndPassword(email, password);
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