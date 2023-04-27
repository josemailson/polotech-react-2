import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ListContainer, TodoListContainer } from "screens/ListView/ListView.style";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from "services/firebaseConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonListView from "components/ButtonListView/ButtonListView";
import Header from "components/Header/Header";
import InputText from "components/InputText/InputText";
import Spacer from "components/Spacer/Spacer";
import { useTask } from "contexts/UserContext";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const {
    setAuthing,
  } = useTask();

  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

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
      toast.info("Criando conta...", {position: toastPosition});
    } else if (user) {
      toast.success("Conta criada com sucesso!", {position: toastPosition});
      setAuthing(false);
      setTimeout(() => {
        history("/login");
      }, 1000);
    }
  }, [error, loading, user, setAuthing, history]);

  function handleSignUp(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    const emailError = validateEmail(email);
    if(emailError) {
      toast.error(emailError, {position: toast.POSITION.TOP_RIGHT});
      return;
    }
    createUserWithEmailAndPassword(email, password);
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
            type="submit" 
            title={loading ? "Carregando..." : "Criar conta"} 
            color={"#81749c"} 
            width={"auto"} 
            height={"1.8rem"} 
            disabled={loading} 
            onClick={handleSignUp}
        />
        <ToastContainer />
        <Spacer width="auto" height="0.8rem" />
        <Link to="/">
          <ButtonListView type="button" title={"Já possui conta? Faça login"} color={"#81749c"} width={"97%"} height={"1.8rem"} disabled={loading} />
        </Link>
      </TodoListContainer>
    </ListContainer>
  );
};

export default Register;