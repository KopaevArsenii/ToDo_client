/* VENDOR */
import React, { useState } from "react"
import { useSelector } from "react-redux"

/* APPLICATION */
import TaskListItem from "../components/TaskListItem"
import { getAllTasks } from "../features/tasksSlice"
import { Select } from "../ui/Select"
import { Input } from "../ui/Input"
import close from "../icons/close.svg"
import NothingFound from "../components/NothingFound"

export const Tasks: React.FC = () => {
    const tasks = useSelector(getAllTasks)

    const [search, setSearch] = useState<string>("")
    const [category, setCategory] = useState<string>("")

    const viewList = tasks.filter((task) => {
        if (!category && !search) {
            return true
        }

        if (category && search) {
            return (
                task.category === category &&
                task.name.toLowerCase().includes(search.toLowerCase())
            )
        }

        if (category) {
            return task.category === category
        }

        if (search) {
            return task.name.toLowerCase().includes(search.toLowerCase())
        }

        return false
    })

    const handleClearFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
        setSearch("")
        setCategory("")
    }

    return (
        <div className="max-w-[1440px] flex flex-col gap-[30px] mx-auto py-[30px]">
            <div className={"flex gap-[30px]"}>
                <Input
                    value={search}
                    placeholder={"Введите назавние задачи"}
                    setValue={setSearch}
                />
                <Select
                    value={category}
                    placeholder={"Введите назавние категории"}
                    setValue={setCategory}
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
                {viewList.length === 0 && (
                    <NothingFound text={"К сожалению, ничего не найдено =("} />
                )}
            </ul>
        </div>
    )
}
