import { User, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "services/firebaseConfig";
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { ITaskState } from "screens/ListView/ListView.types";
import Header from "components/Header/Header";

type UserContextType = {
  handleSignIn: (email: string, password: string) => void;
  user: User | null | undefined;
  loading: boolean;
  error: Error | undefined;
  logout: () => void;
  addTask: (label: string) => Promise<void>;
  updateTask: (taskId: string, isComplete: boolean) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  tasks: ITaskState[];
  setShouldFetchTodos: React.Dispatch<React.SetStateAction<boolean>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  tasksFilter: ITaskState[];
  Status: JSX.Element;
}

type UserContextProviderType = {
  children: React.ReactNode;
}


const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({ children }: UserContextProviderType) => {
  const [authing, setAuthing] = useState(false);
  const [tasks, setTasks] = useState<ITaskState[]>([]);
  const [shouldFetchTodos, setShouldFetchTodos] = useState(true);
  const [tasksFilter, setTaskFilter] = useState<ITaskState[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const logout = () => {
    setAuthing(false);
    signOut(auth);
  };

  function handleSignIn(email: string, password: string) {
    setAuthing(true);
    signInWithEmailAndPassword(auth, email, password);
  }

  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (shouldFetchTodos) {
      const fetchTodos = async () => {
        if (!user) {
          return;
        }
        const q = query(
          collection(firestore, "todo"),
          where("userId", "==", user.uid),
          orderBy("date", "asc")
        );
        const querySnapshot = await getDocs(q);
        const tasks = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            label: data.label,
            isCompleted: data.isCompleted,
            date: data.date,
            userId: data.userId,
          };
        });
        setTasks(tasks);
        setShouldFetchTodos(false);
      };
      fetchTodos();
    }
  }, [user, shouldFetchTodos]);

  useEffect(() => {
    const listTask = tasks.filter((eachTask) => eachTask.label.toLowerCase().includes(searchTerm.toLowerCase()))
    setTaskFilter(listTask);
  }, [searchTerm, tasks]);

  const addTask = async (label: string) => {
    try {
      const docRef = await addDoc(collection(firestore, "todo"), {
        isCompleted: false,
        label: label,
        date: Date.now(),
        userId: user?.uid,
      });
      console.log("Document added: ", docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const updateTask = async (taskId: string, isCompleted: boolean) => {
    try {
      const docRef = await updateDoc(doc(firestore, "todo", taskId), {
        isCompleted: isCompleted,
      });
      console.log("Document updated: ", docRef);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }

  const deleteTask = async (taskId: string) => {
    try {
      const docRef = await deleteDoc(doc(firestore, "todo", taskId));
      console.log("Document deleted: ", docRef);
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  }

  const Status = useMemo(() => {
    const data = tasks.reduce(
      (previous, item) => {
        if (item.isCompleted === true) {
          return {
            completed: previous.completed + 1,
            progress: previous.progress,
          };
        } else {
          return {
            completed: previous.completed,
            progress: previous.progress + 1,
          };
        }
      },
      { completed: 0, progress: 0 }
    );

    return (
      <>
        <Header title={`Total de tarefas: ${tasks.length}`} color={"#ffffff"} as="h2" />
        <Header title={`Concluídas: ${data.completed} | Pendentes: ${data.progress}`} color={"#ffffff"} as="h3" />
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  return <UserContext.Provider value={
    { 
      handleSignIn,
      user,
      loading, 
      error, 
      tasks, 
      searchTerm, 
      tasksFilter, 
      setSearchTerm, 
      setShouldFetchTodos, 
      logout, 
      addTask, 
      updateTask, 
      deleteTask, 
      Status,
      }}>
    {children}
  </UserContext.Provider>
};

const useTask = () => useContext(UserContext);

export { UserContext, useTask };
