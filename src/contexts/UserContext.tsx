import { AuthError, UserCredential, signOut } from "firebase/auth";
import { createContext, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "services/firebaseConfig";

type UserContextType = {
    handleSignIn: (email: string, password: string) => void;
    user: UserCredential | undefined;
    loading: boolean;
    error: AuthError | undefined;
    logout: () => void;
}

type UserContextProviderType = {
    children: React.ReactNode;
}


export const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({ children}: UserContextProviderType) => {

    const [authing, setAuthing] = useState(false);

    const logout = () => {
        setAuthing(false);
        signOut(auth);
      };

      const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);
    
    
      function handleSignIn(email: string, password: string) {
        setAuthing(true);
        signInWithEmailAndPassword(email, password);
      }

    return <UserContext.Provider value={{ handleSignIn, user, loading, error, logout}}>
        {children}
        </UserContext.Provider>
}