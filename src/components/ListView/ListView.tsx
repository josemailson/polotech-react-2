import React, { useState } from "react";
import { ListContainer, TodoListContainer, TodoListItem } from "./ListView.style";
import { ITaskState } from "./ListView.types";
import Checkbox from "../CheckBox/CheckBox";
import Spacer from "../Spacer/Spacer";

const ListView = () => {
    const [tasks, setTasks] = useState<ITaskState[]>([
        {id: "1", label: "Primeira Task", isComplete: false}, {id: "2", label: "Segunda Task", isComplete: false}
    ]);

    const handleTaskCompletion = (task: ITaskState) => {
        const updatedTasks = tasks.map((t) => {
            if (t.id === task.id) {
                return {...t, isComplete: !t.isComplete};
            }
            return t;
        });
        setTasks(updatedTasks);
    };

    return (
        <ListContainer>
            <TodoListContainer>
                {tasks.map((task) => (
                    <>
                        <TodoListItem key={task.id}>
                            <Checkbox
                            checked={task.isComplete}
                            onChange={() => handleTaskCompletion(task)} />
                        <label>{task.label}</label>
                        </TodoListItem>
                        <Spacer height={"8vh"} width={"56vw"} />
                    </>
                ))}
            </TodoListContainer>
        </ListContainer>
    );
};

export default ListView;