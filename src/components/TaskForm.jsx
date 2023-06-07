import '../components/css/styles.css';
import React, { useState } from 'react';

const TaskForm = (props) => {
    const [input, setInput] = useState("");
    const [list, setList] = useState([]); // Setting state of creating list of to do list to empy array so we can map over it and display.

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {  // Putting the tasks (to do list inputs) into empty object with id 
            id: Date.now(),
            text: input,
            completed: false,
        };
        setList([...list, newTask]); // Add the to do list to the empty array
        // setInput = ("");
        e.target.task.value = ""; // Clears the input after clicking "add"

    }

    const handleChange = (e) => { // handles change in keystrokes and setting that to setInput
        setInput(e.target.value)
    }

    const handleToggleComplete = (taskId) => { // Handles when click on radio button as "Task Completed"
        setList(list.map((task) => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        }))
    }
    const handleDelete = (taskId) => {
        setList(list.filter(task => task.id !== taskId));
    }

    return (
        <>
            <div className="form-container" >
                <form type="submit" onSubmit={handleSubmit} >
                    <input id="task" type="text" onChange={handleChange} />
                    <button className="add-btn" type="submit">Add</button>
                </form>
            </div>
            <>
                <div className="todo-list">
                    {list.map((task, index) => {
                        return (

                            <ul className="list-container" key={task.id}>
                                <li key={index}>
                                    <input type="checkbox" onChange={() => handleToggleComplete(task.id)} />

                                    <span className={task.completed ? "completed" : ""}>{task.text}</span>

                                    <button className="delete-btn" onClick={() => handleDelete(task.id)}>Delete</button>

                                </li>
                            </ul>
                        )
                    })}
                </div>
            </>
        </>
    )
};

export default TaskForm