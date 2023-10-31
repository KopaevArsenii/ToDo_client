/* VENDOR */
import { useSelector } from "react-redux"

/* APPLICATION */
import { ListItem } from "../components/ListItem"
import { getAllTasks } from "../features/tasksSlice"
import React, { useState } from "react"
import { Select } from "../ui/Select"
import { Input } from "../ui/Input"
import close from "../icons/close.svg"

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
                    <ListItem key={task.id} item={task} />
                ))}
                {viewList.length === 0 && <div>Ничего не найдено!</div>}
            </ul>
        </div>
    )
}
