/* VENDOR */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

/* APPLICATION */
import { RootState } from "../redux/store"
import { Task } from "../types"
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

export interface TaskSliceState {
    tasks: Task[]
    loading: boolean
    error: string
}

const initialState: TaskSliceState = {
    tasks: [],
    loading: true,
    error: "",
}

export const getTasks = createAsyncThunk("task/fetchTasks", async () => {
    const header = `Bearer ${localStorage.getItem("jwt")}`

    const { data } = await axios.get<Task[]>(`/api/task`, {
        headers: { Authorization: header },
    })

    return data
})

export const deleteTask = createAsyncThunk(
    "task/deleteTaskById",
    async (id: Task["id"]) => {
        const header = `Bearer ${localStorage.getItem("jwt")}`
        await axios.delete<string>(`/api/task/delete?id=${id}`, {
            headers: { Authorization: header },
        })
        return id
    },
)

export const editTask = createAsyncThunk(
    "task/updateTaskById",
    async (task: IEditTask) => {
        const header = `Bearer ${localStorage.getItem("jwt")}`
        const { data } = await axios.put<Task>(
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

export const createTask = createAsyncThunk(
    "task/createTaskById",
    async (task: ICreateTask) => {
        const header = `Bearer ${localStorage.getItem("jwt")}`
        const { data } = await axios.post<Task>(
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
    async (id: Task["id"]) => {
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
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTasks.fulfilled, (state, action) => {
            state.tasks = action.payload
            state.loading = false
            return state
        })
        builder.addCase(getTasks.pending, (state, action) => {
            state.loading = true
            return state
        })
        builder.addCase(getTasks.rejected, (state, action) => {
            state.loading = false
            state.error = "Error while fetching tasks"
            return state
        })
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            state.tasks = state.tasks.filter(
                (task) => task.id != action.payload,
            )
            state.loading = false
            return state
        })
        builder.addCase(deleteTask.pending, (state, action) => {
            state.loading = true
            return state
        })
        builder.addCase(deleteTask.rejected, (state, action) => {
            state.loading = false
            state.error = "Task deletion error"
        })
        builder.addCase(editTask.fulfilled, (state, action) => {
            const oldTask = state.tasks.find(
                (task) => task.id === action.payload.id,
            )

            if (oldTask) {
                oldTask.name = action.payload.name
                oldTask.description = action.payload.description
                oldTask.category = action.payload.category
            }

            state.loading = false
            return state
        })
        builder.addCase(editTask.pending, (state, action) => {
            state.loading = true
            return state
        })
        builder.addCase(editTask.rejected, (state, action) => {
            state.loading = false
            state.error = "Task update error"
            return state
        })
        builder.addCase(createTask.fulfilled, (state, action) => {
            state.tasks.push(action.payload)
            state.loading = false
        })
        builder.addCase(createTask.pending, (state, action) => {
            state.loading = true
            return state
        })
        builder.addCase(createTask.rejected, (state, action) => {
            state.loading = false
            state.error = "Task creation error"
            return state
        })
        builder.addCase(switchTask.fulfilled, (state, action) => {
            state.tasks.forEach((task) => {
                if (task.id === action.payload) {
                    task.done = !task.done
                }
            })
            state.loading = false
            return state
        })
        builder.addCase(switchTask.pending, (state, action) => {
            state.loading = true
            return state
        })
        builder.addCase(switchTask.rejected, (state, action) => {
            state.loading = false
            state.error = "Error while switching task"
            return state
        })
    },
})

export const {} = tasksSlice.actions

export const getTasksState = (state: RootState) => state.tasks

export default tasksSlice.reducer
