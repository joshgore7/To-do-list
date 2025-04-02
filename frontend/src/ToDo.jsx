import { useState } from 'react';


function ToDo() {
    const [task, setTask] = useState('');
    const [taskList, setTaskList] = useState([]);

    const handleAddTask = () => {
        if (task === '') return;
        setTaskList([...taskList, task]);
        setTask('');
    };

    const handleDeleteTask = (index) => {
        const newTasks = taskList.filter((_, i) => i !== index);
        setTaskList(newTasks);
    };

    return (
        <div className="todo-container">
            <h2>To-Do List</h2>
            <div className="input-box">
                <input 
                    type="text" 
                    placeholder="Add a new task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <button onClick={handleAddTask}>Add</button>
            </div>
            <ul className="task-list">
                {taskList.map((task, index) => (
                    <li key={index}>
                        {task}
                        <button onClick={() => handleDeleteTask(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default ToDo;