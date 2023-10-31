/* VENDOR */
import { useSelector } from "react-redux"

/* APPLICATION */
import { ListItem } from "./ListItem"
import { getAllTasks } from "../../features/tasksSlice"
import React, { useState } from "react"
import { Select } from "../../ui/Select/Select"
import { Input } from "../../ui/Input/Input"

import "../Modal/Modal.css"

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
        <>
            <div className={"flex"}>
                <Input
                    value={search}
                    label={"Название задачи"}
                    placeholder={"Введите назавние задачи"}
                    setValue={setSearch}
                />
                <Select
                    value={category}
                    label={"Категория"}
                    placeholder={"Введите назавние категории"}
                    setValue={setCategory}
                />
                <button onClick={handleClearFilters}>Очистить</button>
            </div>
            <ul className="max-w-[1440px] mx-auto bg-white flex flex-col gap-[30px]">
                {viewList.map((task) => (
                    <ListItem key={task.id} item={task} />
                ))}
                {viewList.length === 0 && <div>Ничего не найдено!</div>}
            </ul>
        </>
    )
}
