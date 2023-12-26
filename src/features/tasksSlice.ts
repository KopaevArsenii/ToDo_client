/* VENDOR */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"

/* APPLICATION */
import { RootState } from "../redux/store"
import { ITask } from "../types"
import axios from "axios"

export interface ICreateTask {
    name: string
    description: string
    category: number
}

export interface IEditTask {
    id: number
    name: string
    description: string
    category: number
}

const initialState: ITask[] = []

export const fetchTasks = createAsyncThunk("task/fetchTasks", async () => {
    const header = `Bearer ${localStorage.getItem("jwt")}`
    const { data } = await axios.get<ITask[]>(`/api/task`, {
        headers: { Authorization: header },
    })

    return data
})

export const deleteTaskById = createAsyncThunk(
    "task/deleteTaskById",
    async (id: ITask["id"]) => {
        const header = `Bearer ${localStorage.getItem("jwt")}`
        await axios.delete<string>(`/api/task/delete?id=${id}`, {
            headers: { Authorization: header },
        })
        return id
    },
)

export const updateTaskById = createAsyncThunk(
    "task/updateTaskById",
    async (task: IEditTask) => {
        const header = `Bearer ${localStorage.getItem("jwt")}`
        const { data } = await axios.put<ITask>(
            `/api/task/edit?id=${task.id}`,
            {
                name: task.name,
                description: task.description,
                categoryId: task.category,
            },
            { headers: { Authorization: header } },
        )

        return data
    },
)

export const createTaskById = createAsyncThunk(
    "task/createTaskById",
    async (task: ICreateTask) => {
        const header = `Bearer ${localStorage.getItem("jwt")}`
        const { data } = await axios.post<ITask>(
            `/api/task/create`,
            {
                name: task.name,
                description: task.description,
                categoryId: task.category,
            },
            { headers: { Authorization: header } },
        )

        return data
    },
)

export const switchTask = createAsyncThunk(
    "task/switchTaskAsDone",
    async (id: ITask["id"]) => {
        const header = `Bearer ${localStorage.getItem("jwt")}`
        await axios.get<string>(`/api/task/switch?id=${id}`, {
            headers: { Authorization: header },
        })

        return id
    },
)

export const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state: ITask[], action: PayloadAction<ICreateTask>) => {
            // state.push({
            //     id: 1,
            //     done: false,
            //     ...action.payload,
            // })
        },
        updateTask: (state: ITask[], action: PayloadAction<IEditTask>) => {
            const { id, name, description, category } = action.payload,
                existingTask = state.find((task) => task.id === id)

            if (existingTask) {
                existingTask.name = name
                existingTask.description = description
                // existingTask.category = category
            }
        },
        deleteTask: (state: ITask[], action: PayloadAction<ITask["id"]>) => {
            let rm = (el: ITask, i: number, arr: ITask[]) =>
                    el.id === action.payload,
                rmTaskIndex = state.findIndex(rm)

            state.splice(rmTaskIndex, 1)
        },
        setTaskDone: (state: ITask[], action: PayloadAction<ITask["id"]>) => {
            let task = state.find((task) => task.id === action.payload)
            const currentDoneValue = task?.done
            if (task) {
                task.done = !currentDoneValue
            }
        },
        clearTaskCategory: (state, action) => {
            // state.forEach((task) => {
            //     if (task.category === action.payload) task.category = ""
            // })
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state = action.payload
            return state
        })
        builder.addCase(deleteTaskById.fulfilled, (state, action) => {
            state = state.filter((task) => task.id != action.payload)
            return state
        })
        builder.addCase(updateTaskById.fulfilled, (state, action) => {
            const oldTask = state.find((task) => task.id === action.payload.id)

            if (oldTask) {
                oldTask.name = action.payload.name
                oldTask.description = action.payload.description
                oldTask.category = action.payload.category
            }
            return state
        })
        builder.addCase(createTaskById.fulfilled, (state, action) => {
            state.push(action.payload)
        })
        builder.addCase(switchTask.fulfilled, (state, action) => {
            //Написать
            state.forEach((task) => {
                if (task.id === action.payload) {
                    task.done = !task.done
                }
            })

            return state
        })
    },
})

export const {
    addTask,
    updateTask,
    deleteTask,
    setTaskDone,
    clearTaskCategory,
} = tasksSlice.actions

export const getAllTasks = (state: RootState) => state.tasks

export default tasksSlice.reducer
