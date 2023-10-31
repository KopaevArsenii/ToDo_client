/* VENDOR */
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"

/* APPLICATION */
import { Input } from "../ui/Input"
import { Textarea } from "../ui/Textarea"
import { updateTask } from "../features/tasksSlice"
import { updateCategory } from "../features/categoriesSlice"
import { Select } from "../ui/Select"

interface EditItemProps {
    item: {
        id: string
        name: string
        description: string
        category?: string
    }
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const EditItem: React.FC<EditItemProps> = ({ item, setModal }) => {
    const dispatch = useDispatch(),
        { pathname } = useLocation(),
        isCategories = pathname.includes("categories"),
        [name, setName] = useState<string>(item.name),
        [category, setCategory] = useState<string>(item.category || ""),
        [description, setDescription] = useState<string>(item.description)

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (name === "") return

        if (isCategories) {
            dispatch(updateCategory({ id: item.id, name, description }))
        } else {
            dispatch(updateTask({ id: item.id, name, description, category }))
        }

        setModal(false)
    }

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        setModal(false)
    }
    return (
        <form className="flex flex-col gap-[30px]" onSubmit={onSubmit}>
            {isCategories ? (
                <Input
                    value={name}
                    label={"Название"}
                    placeholder={"Введите название"}
                    setValue={setName}
                />
            ) : (
                <div className={"flex gap-[30px]"}>
                    <Input
                        value={name}
                        label={"Название"}
                        placeholder={"Введите название"}
                        setValue={setName}
                    />
                    <Select
                        value={category}
                        label={"Категория"}
                        placeholder={"Выберете категориб"}
                        setValue={setCategory}
                    />
                </div>
            )}

            <Textarea
                value={description}
                label={"Описание"}
                placeholder={"Введите описание"}
                setValue={setDescription}
            />
            <div className="flex gap-[30px] h-[64px]">
                <button
                    className="button button-default"
                    onClick={handleCancel}
                    type="button"
                >
                    Отмена
                </button>
                <button className="button button-indigo" type="submit">
                    Подтвердить
                </button>
            </div>
        </form>
    )
}
