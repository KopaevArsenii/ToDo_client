/* VENDOR */
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"

/* APPLICATION */
import { Input } from "../ui/Input"
import { Textarea } from "../ui/Textarea"
import { addTask } from "../features/tasksSlice"
import { addCategory } from "../features/categoriesSlice"
import { Select } from "../ui/Select"

interface CreateItemProps {
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const CreateItem: React.FC<CreateItemProps> = ({ setModal }) => {
    const dispatch = useDispatch(),
        { pathname } = useLocation(),
        isCategories = pathname.includes("categories"),
        [name, setName] = useState<string>(""),
        [category, setCategory] = useState<string>(""),
        [description, setDescription] = useState<string>("")

    function clearForm() {
        setName("")
        setDescription("")
        setCategory("")
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (name === "") return
        if (isCategories) {
            dispatch(addCategory({ name, description }))
        } else {
            dispatch(addTask({ name, description, category }))
        }
        clearForm()
        setModal(false)
    }

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        setModal(false)
    }

    return (
        <form onSubmit={onSubmit}>
            {isCategories ? (
                <Input
                    value={name}
                    label={"Название"}
                    placeholder={"Введите название"}
                    setValue={setName}
                />
            ) : (
                <div className="modal__content_row">
                    <Input
                        value={name}
                        label={"Название"}
                        placeholder={"Введите название"}
                        setValue={setName}
                    />
                    <Select
                        value={category}
                        label={"Категории"}
                        placeholder={"Выберете категорию"}
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
            <button type="submit">Подтвердить</button>
            <button onClick={handleCancel} type="button">
                Отмена
            </button>
        </form>
    )
}
