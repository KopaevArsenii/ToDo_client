import React, { FC, useState } from "react"
import { useDispatch } from "react-redux"

import { updateTask } from "../features/tasksSlice"
import { Input } from "../ui/Input"
import { Select } from "../ui/Select"
import { Textarea } from "../ui/Textarea"

interface EditTaskProps {
    item: {
        id: string
        name: string
        description: string
        category: string
        done: boolean
    }
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const EditTask: FC<EditTaskProps> = ({ item, setModal }) => {
    const dispatch = useDispatch()
    const [name, setName] = useState<string>(item.name)
    const [category, setCategory] = useState<string>(item.category)
    const [description, setDescription] = useState<string>(item.description)

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (name === "") return
        dispatch(updateTask({ id: item.id, name, description, category }))
        setModal(false)
    }

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        setModal(false)
    }

    return (
        <form className="flex flex-col gap-[30px]" onSubmit={onSubmit}>
            <div className={"flex gap-[30px]"}>
                <Input
                    value={name}
                    label={"Название"}
                    placeholder={"Введите название"}
                    setValue={setName}
                    required
                />
                <Select
                    value={category}
                    label={"Категория"}
                    placeholder={"Выберете категориб"}
                    setValue={setCategory}
                />
            </div>

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

export default EditTask