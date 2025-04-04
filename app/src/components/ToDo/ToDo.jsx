import React, { useState, useEffect } from 'react';
import {
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Collapse
} from '@mui/material';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
    ClearAll as ClearAllIcon,
} from '@mui/icons-material';
import './ToDo.css'


function ToDo({ userId }) {
    const [task, setTask] = useState('');
    const [taskList, setTaskList] = useState([]);
    const [subtask, setSubtask] = useState('');
    const [openSubtasks, setOpenSubtasks] = useState({});


    useEffect(() => {
        const savedTasks = localStorage.getItem(`tasks_${userId}`);
        if (savedTasks) {
            setTaskList(JSON.parse(savedTasks));
        }
    }, [userId]);


    useEffect(() => {
        localStorage.setItem(`tasks_${userId}`, JSON.stringify(taskList));
    }, [taskList, userId]);

    const addTask = () => {
        if (!task.trim()) return;
        setTaskList([...taskList, {
            id: Date.now(),
            text: task,
            completed: false,
            subtasks: []
        }]);
        setTask('');
    };

    const deleteTask = (id) => {
        setTaskList(taskList.filter(task => task.id !== id));
    };

    const toggleTask = (id) => {
        setTaskList(taskList.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const addSubtask = (taskId) => {
        if (!subtask.trim()) return;
        setTaskList(taskList.map(task => 
            task.id === taskId ? {
                ...task,
                subtasks: [...task.subtasks, { id: Date.now(), text: subtask, completed: false }]
            } : task
        ));
        setSubtask('');
    };

    const toggleSubtask = (taskId, subtaskId) => {
        setTaskList(taskList.map(task => 
            task.id === taskId ? {
                ...task,
                subtasks: task.subtasks.map(subtask => 
                    subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask
                )
            } : task
        ));
    };

    const deleteSubtask = (taskId, subtaskId, e) => {
        e.stopPropagation();
        setTaskList(taskList.map(task => 
            task.id === taskId ? {
                ...task,
                subtasks: task.subtasks.filter(subtask => subtask.id !== subtaskId)
            } : task
        ));
    };

    const toggleSubtasks = (taskId) => {
        setOpenSubtasks(prev => ({ ...prev, [taskId]: !prev[taskId] }));
    };

    const clearCompleted = () => {
        setTaskList(taskList.map(task => ({
            ...task,
            completed: false,
            subtasks: task.subtasks.map(subtask => ({
                ...subtask,
                completed: false
            }))
        })));
    };

    return (
        <div className="todo-container">
            <div className="todo-header">
                <h2>To-Do List </h2>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={clearCompleted}
                    startIcon={<ClearAllIcon />}
                    className="mui-btn"
                >
                    Clear
                </Button>
            </div>
            <div className="input-box">
                <input 
                    type="text" 
                    placeholder="Add a new task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTask()}
                />
                <Button
                    variant="contained"
                    onClick={addTask}
                    startIcon={<AddIcon />}
                    className="mui-btn"
                >
                    Add
                </Button>
            </div>

            <List>
                {taskList.map((task) => (
                    <div key={task.id}>
                        <ListItem
                            button
                            onClick={() => toggleTask(task.id)}
                            className={task.completed ? 'completed' : ''}
                        >
                            <ListItemText primary={task.text} />
                            <ListItemSecondaryAction>
                                <IconButton
                                    edge="end"
                                    onClick={() => toggleSubtasks(task.id)}
                                    sx={{ mr: 1 }}
                                >
                                    {openSubtasks[task.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                </IconButton>
                                <IconButton
                                    edge="end"
                                    onClick={() => deleteTask(task.id)}
                                    color="error"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>

                        <Collapse in={openSubtasks[task.id]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <div className="subtask-input">
                                    <input
                                        type="text"
                                        placeholder="Add a subtask"
                                        value={subtask}
                                        onChange={(e) => setSubtask(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && addSubtask(task.id)}
                                    />
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() => addSubtask(task.id)}
                                        startIcon={<AddIcon />}
                                        className="mui-btn"
                                    >
                                        Add
                                    </Button>
                                </div>
                                {task.subtasks.map((subtask) => (
                                    <ListItem
                                        key={subtask.id}
                                        button
                                        onClick={() => toggleSubtask(task.id, subtask.id)}
                                        className={subtask.completed ? 'completed' : ''}
                                    >
                                        <ListItemText primary={subtask.text} />
                                        <IconButton
                                            edge="end"
                                            onClick={(e) => deleteSubtask(task.id, subtask.id, e)}
                                            color="error"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    </div>
                ))}
            </List>
        </div>
    );
}

export default ToDo;