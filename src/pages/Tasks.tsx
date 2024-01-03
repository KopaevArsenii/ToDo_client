/* VENDOR */
import React, { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"

/* APPLICATION */
import TaskListItem from "../components/TaskListItem"
import NothingFound from "../components/NothingFound"
import { getTasks, getTasksState } from "../features/tasksSlice"
import { Select } from "../ui/Select"
import { Input } from "../ui/Input"
import close from "../icons/close.svg"
import {
    fetchCategories,
    getCategoriesState,
} from "../features/categoriesSlice"
import { Id, toast } from "react-toastify"
import { Category } from "../types"

export const Tasks: React.FC = () => {
    const dispatch = useAppDispatch()
    const {
        tasks,
        loading: taskLoading,
        error: taskError,
    } = useAppSelector(getTasksState)
    const {
        categories,
        loading: categoriesLoading,
        error: categoriesError,
    } = useAppSelector(getCategoriesState)
    const toastId = useRef<Id>()

    const [search, setSearch] = useState<string>("")
    const [category, setCategory] = useState<Category["id"]>(0)

    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(getTasks())
    }, [])

    useEffect(() => {
        if ((taskLoading || categoriesLoading) && !toastId.current) {
            toastId.current = toast.loading("Loading")
        } else if (toastId.current) {
            toast.dismiss(toastId.current)
            toastId.current = undefined
        }
    }, [taskLoading, categoriesLoading])

    useEffect(() => {
        if (taskError) {
            toast.error(taskError)
        }
        if (categoriesError) {
            toast.error(categoriesError)
        }
    }, [taskError, categoriesError])

    const viewList = tasks.filter((task) => {
        if (!category && !search) {
            return true
        }

        if (category && search) {
            return (
                task.category.id === category &&
                task.name.toLowerCase().includes(search.toLowerCase())
            )
        }

        if (category) {
            return task.category.id === category
        }

        if (search) {
            return task.name.toLowerCase().includes(search.toLowerCase())
        }

        return false
    })

    const handleClearFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setSearch("")
        setCategory(0)
    }

    return (
        <div className="max-w-[1440px] flex flex-col gap-[30px] mx-auto py-[30px]">
            <div className={"flex gap-[30px]"}>
                <Input
                    value={search}
                    placeholder={"Enter task title"}
                    setValue={setSearch}
                />
                <Select
                    options={categories}
                    value={category}
                    placeholder={"Select category title"}
                    setValue={setCategory}
                    required
                />
                <button
                    className="border border-slate-200 hover:border-indigo-500 rounded-[8px] w-[64px] h-[64px] shrink-0"
                    onClick={handleClearFilters}
                >
                    <img className="m-auto" src={close} alt={"close"} />
                </button>
            </div>
            <ul className="flex flex-col gap-[30px]">
                {viewList.map((task) => (
                    <TaskListItem key={task.id} task={task} />
                ))}
                {viewList.length === 0 && !taskLoading && (
                    <NothingFound text={"No tasks yet. Create!"} />
                )}
            </ul>
        </div>
    )
}
