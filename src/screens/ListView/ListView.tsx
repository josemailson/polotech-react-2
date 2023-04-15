import React, { ChangeEvent, useState, KeyboardEvent } from "react";
import { ListContainer, TodoListContainer, TodoListItem, StrikethroughLabel } from "./ListView.style";
import { ITaskState } from "./ListView.types";
import Checkbox from "../../components/CheckBox/CheckBox";
import Spacer from "../../components/Spacer/Spacer";
import InputText from "../../components/InputText/InputText";
import { nanoid } from "nanoid";
import Header from "../../components/Header/Header";
import ButtonListView from "../../components/ButtonListView/ButtonListView";

const ListView = () => {
    const [tasks, setTasks] = useState<ITaskState[]>([]);
    const [newTaskLabel, setNewTaskLabel] = useState("");

    const handleNewTaskLabelChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskLabel(event.target.value);
      };
    
      const addTask = (label: string) => {
        const id = nanoid();
        setTasks((tasks) => [...tasks, { id, label: label, isComplete: false }]);
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

    return (
        <ListContainer>
            <Header title={"To Do App"} color={"#ffffff"} />
            <h2>Total de tarefas: {tasks.length}</h2>
            <Spacer height="3rem" />
            <TodoListContainer>
                {tasks.map((task) => (
                    <TodoListItem key={task.id}>
                        <Checkbox
                            checked={task.isComplete}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                handleTaskCompleteChange(event, task)
                              }/>
                        <Spacer width={"2rem"} />
                        {task.isComplete ? (
                            <StrikethroughLabel>{task.label}</StrikethroughLabel>
                        ) : (
                            task.label
                        )}
                        <Spacer width={"2rem"} />
                        <ButtonListView title={"x"} color={"#e63946"} width={"1.8rem"} height={"1.8rem"}disabled={false} onClick={(event) => handleClickRemove(event, task.id)}/>
                    </TodoListItem>
                ))}
            </TodoListContainer>
            <Spacer height="3rem" />
            <InputText placeholder={"Adicione uma nova tarefa"} inputColor={"#ffffff"} onChange={handleNewTaskLabelChange} onKeyPress={handleNewTaskKeyPress} value={newTaskLabel}/>
            <Spacer height="3rem" />
        </ListContainer>
    );
};

export default ListView;