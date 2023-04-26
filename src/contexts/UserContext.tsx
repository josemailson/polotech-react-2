import { AuthError, User, UserCredential, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useState } from "react";
import { useAuthState, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "services/firebaseConfig";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";

type UserContextType = {
  handleSignIn: (email: string, password: string) => void;
  user: User | null | undefined;
  loading: boolean;
  error: Error | undefined;
  logout: () => void;
  addTask: (label: string) => Promise<void>;
  updateTask: (taskId: string, isComplete: boolean) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
}

type UserContextProviderType = {
  children: React.ReactNode;
}


export const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({ children }: UserContextProviderType) => {
  const [authing, setAuthing] = useState(false);

  const logout = () => {
    setAuthing(false);
    signOut(auth);
  };

  function handleSignIn(email: string, password: string) {
    setAuthing(true);
    signInWithEmailAndPassword(auth, email, password);
  }

  const [user, loading, error] = useAuthState(auth);

  const addTask = async (label: string) => {
    try {
      const docRef = await addDoc(collection(firestore, "todo"), {
        isCompleted: false,
        label: label,
        date: Date.now(),
        userId: user?.uid,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }  
  }

  const updateTask = async (taskId: string, isCompleted: boolean) => {
    try {
      const docRef = await updateDoc(doc(firestore, "todo", taskId), {
        isCompleted: isCompleted,
      });
      console.log("Document updated with ID: ", taskId);
    } catch (e) {
      console.error("Error updating document: ", e);
    }  
  }

  const deleteTask = async (taskId: string) => {
    try {
      const docRef = await deleteDoc(doc(firestore, "todo", taskId));
      console.log("Document deleted with ID: ", taskId);
    } catch (e) {
      console.error("Error deleting document: ", e);
    }  
  }

  return <UserContext.Provider value={{ handleSignIn, user, loading, error, logout, addTask, updateTask, deleteTask}}>
    {children}
  </UserContext.Provider>
}