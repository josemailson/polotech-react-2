import React, { ChangeEvent, useState, KeyboardEvent, useCallback } from "react";
import { ListContainer, TodoListContainer, TodoListItem, StrikethroughLabel } from "./ListView.style";
import { ITaskState } from "./ListView.types";
import Checkbox from "components/CheckBox/CheckBox";
import Spacer from "components/Spacer/Spacer";
import InputText from "components/InputText/InputText";
import Header from "components/Header/Header";
import ButtonListView from "components/ButtonListView/ButtonListView";
import { useTask } from "contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const ListView = () => {
  const [newTaskLabel, setNewTaskLabel] = useState("");
  const {
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
  } = useTask();

  const history = useNavigate();

  const handleNewTaskLabelChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskLabel(event.target.value);
  };

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };


  const handleNewTaskKeyPress = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const toastPosition = toast.POSITION.TOP_RIGHT;
      if (event.key === "Enter" && newTaskLabel !== "") {
        const isTaskExists = tasks.some(task => task.label.toLowerCase() === newTaskLabel.toLowerCase());
        if (isTaskExists) {
          toast.error("Tarefa já cadastrada!", {position: toastPosition});
          return;
        }
        addTask(newTaskLabel);
        setShouldFetchTodos(true);
        setNewTaskLabel("");
      }
    },
    [addTask, setShouldFetchTodos, newTaskLabel, tasks]
  );

  const updateTaskCompletion = async (taskId: string, isCompleted: boolean) => {
    await updateTask(taskId, isCompleted);
    setShouldFetchTodos(true);
  }

  const handleTaskCompleteChange = (event: ChangeEvent<HTMLInputElement>, eachTask: ITaskState) => {
    updateTaskCompletion(eachTask.id, event.target.checked)
  }

  const handleClickRemove = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, taskId: string) => {
    updateTaskDeletion(taskId);
  };

  const updateTaskDeletion = async (taskId: string) => {
    await deleteTask(taskId);
    setShouldFetchTodos(true);
  }

  const handleClickLogout = () => {
    logout();
    setTimeout(() => {
      history("/");
    }, 1000);
  }

  return (
    <ListContainer>
      <Header title={"To Do App"} color={"#ffffff"} as="h1" />
      {Status}
      <Spacer height="0.4rem" />
      <InputText placeholder={"Pesquisar"} inputColor={"#ffffff"} onChange={handleSearchTermChange} value={searchTerm} />
      <Spacer height="0.8rem" />
      <TodoListContainer>
        {tasks.length === 0 ? (
          <Header title={"Sem tarefas cadastradas"} color={"#ffffff"} as="h2" />
        ) : <>{tasksFilter.map((task) => (
          <TodoListItem key={task.id}>
            <Checkbox
              checked={task.isCompleted}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleTaskCompleteChange(event, task)
              } />
            <Spacer width={"0.8rem"} />
            {task.isCompleted ? (
              <StrikethroughLabel>{task.label}</StrikethroughLabel>
            ) : (
              task.label
            )}
            <Spacer width={"0.8rem"} />
            <ButtonListView type="button" title={"x"} color={"#e63946"} width={"1.8rem"} height={"1.8rem"} disabled={false} onClick={(event) => handleClickRemove(event, task.id)} />
          </TodoListItem>

        ))}</>}
      </TodoListContainer>
      <Spacer height="0.8rem" />
      <InputText placeholder={"Adicione uma nova tarefa"} inputColor={"#ffffff"} onChange={handleNewTaskLabelChange} onKeyPress={handleNewTaskKeyPress} value={newTaskLabel} />
      <ToastContainer />
      <Spacer height="0.8rem" />
      <ButtonListView type="button" title={"Sair"} color={"#81749c"} width="auto" height={"1.8rem"} disabled={false} onClick={handleClickLogout} />
    </ListContainer>
  );
};

export default ListView;