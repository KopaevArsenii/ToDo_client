/* VENDOR */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"

/* APPLICATION */
import { RootState } from "../redux/store"
import { ICategory } from "../types"
import axios from "axios"

export interface ICreateCategory {
    name: string
    description: string
}

const initialState: ICategory[] = []

export const fetchCategories = createAsyncThunk(
    "category/fetchCategories",
    async () => {
        const header = `Bearer ${localStorage.getItem("jwt")}`
        const { data } = await axios.get<ICategory[]>("/api/category", {
            headers: { Authorization: header },
        })
        return data
    },
)

export const deleteCategoryById = createAsyncThunk(
    "category/deleteCategoryById",
    async (id: string) => {
        const header = `Bearer ${localStorage.getItem("jwt")}`
        await axios.delete<string>(`/api/category/delete?id=${id}`, {
            headers: { Authorization: header },
        })

        return id
    },
)

// export const deleteCategory = createAsyncThunk(
//     "category/deleteCategory",
//     async (id: number) => {
//         const header = `Bearer ${localStorage.getItem("jwt")}`
//         await axios.delete(`/api/category/delete?id=${1}`, {
//             headers: { Authorization: header },
//         })
//         return id
//     },
// )

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
        // deleteCategory: (state: ICategory[], action: PayloadAction<string>) => {
        //     const remove = (element: ICategory) =>
        //             element.id === action.payload,
        //         removeTaskIndex = state.findIndex(remove)
        //     state.splice(removeTaskIndex, 1)
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state = action.payload
            return state
        })
        builder.addCase(deleteCategoryById.fulfilled, (state, action) => {
            state = state.filter((category) => category.id !== action.payload)
            return state
        })
    },
})

export const { addCategory, updateCategory } = categoriesSlice.actions

export const getAllCategories = (state: RootState) => state.categories

export default categoriesSlice.reducer
