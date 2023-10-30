/* VENDOR */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

/* APPLICATION */
import { RootState } from "../redux/store";

export interface ITask {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface ICreateTask {
  name: string,
  description: string,
  category: string
}


const initialState: ITask[] = [];

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    tasksAdded: (
        state: ITask[],
        action: PayloadAction<ICreateTask>
    ) => {
      state.push({
        id: uuidv4(),
        ...action.payload,
      });
    },
    tasksUpdated: (
        state: ITask[],
        action: PayloadAction<ITask>
    ) => {
      const { id, name, description, category } = action.payload,
        existingTask = state.find((task) => task.id === id);

      if (existingTask) {
        existingTask.name = name;
        existingTask.description = description;
        existingTask.category = category;
      }
    },
    tasksRemoved: (
        state: ITask[],
        action: PayloadAction<string>
    ) => {
      let rm = (el: ITask, i: number, arr: ITask[]) =>
          el.id === action.payload,
        rmTaskIndex = state.findIndex(rm);

      state.splice(rmTaskIndex, 1);
    },
    tasksClearedCategories: (state, action) => {
      state.forEach((task) => {
        if (task.category === action.payload) task.category = "";
      });
    },
  },
});

export const {
  tasksAdded,
  tasksUpdated,
  tasksRemoved,
  tasksClearedCategories,
} = tasksSlice.actions;

export const selectAllTasks = (state: RootState) => state.tasks;

export default tasksSlice.reducer;
