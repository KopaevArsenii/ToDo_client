/* VENDOR */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

/* APPLICATION */
import { RootState } from "../app/store";

export interface CategoriesState {
  id: string;
  name: string;
  description: string;
}

const initialState: CategoriesState[] = [];

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    categoriesAdded: (state, action) => {
      state.push({
        id: uuidv4(),
        ...action.payload,
      });
    },
    categoriesUpdated: (state, action) => {
      const { id, name, description } = action.payload,
        existingCategory = state.find((category) => category.id === id);

      if (existingCategory) {
        existingCategory.name = name;
        existingCategory.description = description;
      }
    },
    categoriesRemoved: (
      state: CategoriesState[],
      action: PayloadAction<string>
    ) => {
      let rm = (el: CategoriesState, i: number, arr: CategoriesState[]) =>
          el.id === action.payload,
        rmTaskIndex = state.findIndex(rm);

      state.splice(rmTaskIndex, 1);
    },
  },
});

export const { categoriesAdded, categoriesUpdated, categoriesRemoved } =
  categoriesSlice.actions;

export const selectAllCategories = (state: RootState) => state.categories;

export default categoriesSlice.reducer;
