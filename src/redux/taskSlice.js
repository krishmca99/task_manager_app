import { createSlice } from "@reduxjs/toolkit";
import { createTask, deleteTask, fetchTasks, reorderTaskThunk, updateTask } from "./tasksThunks";

const taskSlice = createSlice({
  name: "tasks",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      }).addCase(createTask.fulfilled,(state,action)=>{
        state.items.push(action.payload)
      }).addCase(updateTask.fulfilled,(state,action)=>{
        state.items = state.items.map((task)=>task.id === action.payload.id ? action.payload:task)
      }).addCase(deleteTask.fulfilled,(state,action)=>{
        state.items = state.items.filter((task)=>task.id !== action.payload);
      }).addCase(reorderTaskThunk.fulfilled,(state,action)=>{
        state.items= action.payload;
      });
  },
});

export default taskSlice.reducer;
