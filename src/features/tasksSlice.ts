/* VENDOR */
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"

/* APPLICATION */
import { RootState } from "../redux/store"
import { ITask } from "../types"

export interface ICreateTask {
    name: string
    description: string
    category: string
}

export interface IEditTask {
    id: string
    name: string
    description: string
    category: string
}

const initialState: ITask[] = []

export const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state: ITask[], action: PayloadAction<ICreateTask>) => {
            state.push({
                id: uuidv4(),
                done: false,
                ...action.payload,
            })
        },
        updateTask: (state: ITask[], action: PayloadAction<IEditTask>) => {
            const { id, name, description, category } = action.payload,
                existingTask = state.find((task) => task.id === id)

            if (existingTask) {
                existingTask.name = name
                existingTask.description = description
                existingTask.category = category
            }
        },
        deleteTask: (state: ITask[], action: PayloadAction<string>) => {
            let rm = (el: ITask, i: number, arr: ITask[]) =>
                    el.id === action.payload,
                rmTaskIndex = state.findIndex(rm)

            state.splice(rmTaskIndex, 1)
        },
        setTaskDone: (state: ITask[], action: PayloadAction<string>) => {
            console.log("jhialdkj")
            let task = state.find((task) => task.id === action.payload)
            const currentDoneValue = task?.done
            if (task) {
                task.done = !currentDoneValue
            }
        },
        clearTaskCategory: (state, action) => {
            state.forEach((task) => {
                if (task.category === action.payload) task.category = ""
            })
        },
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
