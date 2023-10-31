/* VENDOR */
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"

/* APPLICATION */
import { RootState } from "../redux/store"

export interface ICategory {
    id: string
    name: string
    description: string
}

export interface ICreateCategory {
    name: string
    description: string
}

const initialState: ICategory[] = []

export const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        addCategory: (
            state: ICategory[],
            action: PayloadAction<ICreateCategory>,
        ) => {
            state.push({
                id: uuidv4(),
                ...action.payload,
            })
        },
        updateCategory: (
            state: ICategory[],
            action: PayloadAction<ICategory>,
        ) => {
            const { id, name, description } = action.payload,
                existingCategory = state.find((category) => category.id === id)

            if (existingCategory) {
                existingCategory.name = name
                existingCategory.description = description
            }
        },
        deleteCategory: (state: ICategory[], action: PayloadAction<string>) => {
            // state.filter((category: CategoriesState) => category.id === action.payload)
            const remove = (element: ICategory) =>
                    element.id === action.payload,
                removeTaskIndex = state.findIndex(remove)
            state.splice(removeTaskIndex, 1)
        },
    },
})

export const { addCategory, updateCategory, deleteCategory } =
    categoriesSlice.actions

export const getAllCategories = (state: RootState) => state.categories

export default categoriesSlice.reducer
