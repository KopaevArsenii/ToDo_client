/* VENDOR */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

/* APPLICATION */
import { RootState } from "../app/store";

export interface CategoriesState {
  id: string;
  name: string;
  description: string;
  category: string;
}

const initialState: CategoriesState[] = [];

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    tasksAdded: (state, action) => {
      state.push({
        id: uuidv4(),
        ...action.payload,
      });
    },
    tasksUpdated: (state, action) => {
      const { id, name, description, category } = action.payload,
        existingTask = state.find((task) => task.id === id);

      if (existingTask) {
        existingTask.name = name;
        existingTask.description = description;
        existingTask.category = category;
      }
    },
    tasksRemoved: (state, action) => {
      let rm = (el: CategoriesState, i: number, arr: CategoriesState[]) =>
          el.id === action.payload,
        rmTaskIndex = state.findIndex(rm);

      state.splice(rmTaskIndex, 1);
    },
    tasksClearedCategories: (state, action) => {
      state.map((task) => {
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
