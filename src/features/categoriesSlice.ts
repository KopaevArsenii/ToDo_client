/* VENDOR */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

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

export const updateCategoryById = createAsyncThunk(
    "category/updateCategory",
    async (category: ICategory) => {
        const header = `Bearer ${localStorage.getItem("jwt")}`
        await axios.put<string>(
            `/api/category/edit?id=${category.id}`,
            {
                name: category.name,
                description: category.description,
            },
            {
                headers: { Authorization: header },
            },
        )
        return category
    },
)

export const createCategoryById = createAsyncThunk(
    "category/createCategoryById",
    async (category: ICreateCategory) => {
        const header = `Bearer ${localStorage.getItem("jwt")}`
        const { data } = await axios.post<ICategory>(
            `/api/category/create`,
            category,
            { headers: { Authorization: header } },
        )

        return data
    },
)

export const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state = action.payload
            return state
        })
        builder.addCase(deleteCategoryById.fulfilled, (state, action) => {
            state = state.filter((category) => category.id !== action.payload)
            return state
        })
        builder.addCase(updateCategoryById.fulfilled, (state, action) => {
            const { id, name, description } = action.payload
            let oldCategory = state.find((category) => category.id === id)
            if (oldCategory) {
                oldCategory.name = name
                oldCategory.description = description
            }
            return state
        })

        builder.addCase(createCategoryById.fulfilled, (state, action) => {
            state.push(action.payload)
            return state
        })
    },
})

export const getAllCategories = (state: RootState) => state.categories

export default categoriesSlice.reducer
