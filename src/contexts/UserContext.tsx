import { AuthError, UserCredential, signOut } from "firebase/auth";
import { createContext, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "services/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

type UserContextType = {
  handleSignIn: (email: string, password: string) => void;
  user: UserCredential | undefined;
  loading: boolean;
  error: AuthError | undefined;
  logout: () => void;
  addTask: (label: string) => Promise<void>;
}

type UserContextProviderType = {
  children: React.ReactNode;
}


export const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({ children }: UserContextProviderType) => {

  const [authing, setAuthing] = useState(false);
  const [userData, setUserData] = useState(null);

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

  const addTask = async (label: string) => {
    try {
      const docRef = await addDoc(collection(firestore, "todo"), {
        isComplete: false,
        label: label,
        date: Date.now(),
        userId: user?.user.uid,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }  
  }



  return <UserContext.Provider value={{ handleSignIn, user, loading, error, logout, addTask }}>
    {children}
  </UserContext.Provider>
}