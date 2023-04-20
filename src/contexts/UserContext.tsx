import { AuthError, User, UserCredential, signOut } from "firebase/auth";
import { createContext, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "services/firebaseConfig";
import { DocumentData, doc, getDoc, addDoc, collection } from "firebase/firestore";
import { ITaskState } from "screens/ListView/ListView.types";

type UserContextType = {
  handleSignIn: (email: string, password: string) => void;
  user: UserCredential | undefined;
  loading: boolean;
  error: AuthError | undefined;
  logout: () => void;
  getUserData: (user: User) => Promise<DocumentData | null>;
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

  const getUserData = async (user: User) => {
    const docRef = doc(firestore, "todo", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  }

  const addTask = async (label: string) => {
    try {
      const docRef = await addDoc(collection(firestore, "todo"), {
        isComplete: false,
        label: label,
        userId: user?.user.uid,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }  
  }



  return <UserContext.Provider value={{ handleSignIn, user, loading, error, logout, getUserData, addTask }}>
    {children}
  </UserContext.Provider>
}