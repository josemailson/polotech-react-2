import React, { ChangeEvent, useState, KeyboardEvent, useEffect, useContext } from "react";
import { ListContainer, TodoListContainer, TodoListItem, StrikethroughLabel } from "./ListView.style";
import { ITaskState } from "./ListView.types";
import Checkbox from "components/CheckBox/CheckBox";
import Spacer from "components/Spacer/Spacer";
import InputText from "components/InputText/InputText";
import { nanoid } from "nanoid";
import Header from "components/Header/Header";
import ButtonListView from "components/ButtonListView/ButtonListView";
import { signOut } from "firebase/auth";
import { auth } from "services/firebaseConfig"
import { UserContext } from "contexts/UserContext";
import { useNavigate } from "react-router-dom";

const ListView = () => {
  const [tasks, setTasks] = useState<ITaskState[]>([]);
  const [newTaskLabel, setNewTaskLabel] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [tasksFilter, setTaskFilter] = useState<ITaskState[]>([]);
  const history = useNavigate();

  const userContext = useContext(UserContext);
  console.log("🚀 ~ file: index.tsx:21 ~ ListView ~ userContext:", userContext.user?.user.uid);


  const handleNewTaskLabelChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskLabel(event.target.value);
  };

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const listTask = tasks.filter((eachTask) => eachTask.label.toLowerCase().includes(searchTerm.toLowerCase()))
    setTaskFilter(listTask);
}, [searchTerm, tasks]);


  const addTask = (label: string) => {
    const id = nanoid();
    const isTaskExists = tasks.some(task => task.label.toLowerCase() === label.toLowerCase());
    if (isTaskExists) {
      alert("Tarefa já cadastrada!");
      return;
    }
    setTasks(tasks => [...tasks, { id, label: label, isComplete: false }]);
  };

  const handleNewTaskKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && newTaskLabel !== "") {
      addTask(newTaskLabel);
      setNewTaskLabel("");
    }
  };

  const updateTaskCompletion = (taskId: string, isComplete: boolean) => {
    setTasks((tasks) => tasks.map((task) => {
      if (task.id === taskId) return { ...task, isComplete }
      return task;
    })
    )
  }

  const handleTaskCompleteChange = (event: ChangeEvent<HTMLInputElement>, eachTask: ITaskState) => {
    updateTaskCompletion(eachTask.id, event.target.checked)
  }

  const handleClickRemove = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, taskId: string) => {
    const newTasks = tasks.filter((item) => item.id !== taskId);
    setTasks(newTasks);
  };

  const handleClickLogout = () => {
    userContext.logout();
    setTimeout(() => {
      history("/");
    }, 1000);
  }

  return (
    <ListContainer>
      <Header title={"To Do App"} color={"#ffffff"} as="h1"/>
      <Header title={`Total de tarefas: ${tasks.length}`} color={"#ffffff"} as="h2"/>
      <Spacer height="0.4rem" />
      <InputText placeholder={"Pesquisar"} inputColor={"#ffffff"} onChange={handleSearchTermChange} value={searchTerm} />
      <Spacer height="0.8rem" />
      <TodoListContainer>
        {tasks.length === 0 ? (
          <Header title={"Sem tarefas cadastradas"} color={"#ffffff"} as="h2"/>
        ) : <>{tasksFilter.map((task) => (
          <TodoListItem key={task.id}>
            <Checkbox
              checked={task.isComplete}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleTaskCompleteChange(event, task)
              } />
            <Spacer width={"0.8rem"} />
            {task.isComplete ? (
              <StrikethroughLabel>{task.label}</StrikethroughLabel>
            ) : (
              task.label
            )}
            <Spacer width={"0.8rem"} />
            <ButtonListView title={"x"} color={"#e63946"} width={"1.8rem"} height={"1.8rem"} disabled={false} onClick={(event) => handleClickRemove(event, task.id)} />
          </TodoListItem>

        ))}</>}
      </TodoListContainer>
      <Spacer height="0.8rem" />
      <InputText placeholder={"Adicione uma nova tarefa"} inputColor={"#ffffff"} onChange={handleNewTaskLabelChange} onKeyPress={handleNewTaskKeyPress} value={newTaskLabel} />
      <Spacer height="0.8rem" />
      <ButtonListView title={"Sair"} color={"#81749c"} width="auto" height={"1.8rem"} disabled={false} onClick={handleClickLogout}/>
    </ListContainer>
  );
};

export default ListView;