import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "../../types/task";

const initialState: Task[] = [];

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.push(action.payload);
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.find(t => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    reorderTasks: (state, action: PayloadAction<Task[]>) => {
      return action.payload;
    },
  },
});

export const { addTask, toggleTask, reorderTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
