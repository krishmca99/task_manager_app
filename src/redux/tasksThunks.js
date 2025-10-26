import { createAsyncThunk } from '@reduxjs/toolkit';
import {getTasks,addTask,updateTasks,deleteTask as deleteTaskApi,reorderTaskList} from '../api/TasksAPI';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks',async()=>{
    return await getTasks();
});

export const createTask = createAsyncThunk('tasks/createTask', async (task)=>{
    return await addTask(task);
});

export const updateTask =createAsyncThunk('tasks/updateTask', async ({id,data})=>{
return await updateTasks(id,data)
})

export const deleteTask = createAsyncThunk('tasks/delete', async(id)=>{return await deleteTaskApi(id)})

export const reorderTaskThunk = createAsyncThunk("tasks/reorderTaskThunk",async (newOrder)=>{
    return await reorderTaskList(newOrder);
});