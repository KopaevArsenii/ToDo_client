/* VENDOR */
import React, { FC, useState } from "react"
import { useAppDispatch } from "../redux/hooks"

/* APPLICATION */
import { updateTask, updateTaskById } from "../features/tasksSlice"
import { Input } from "../ui/Input"
import { Select } from "../ui/Select"
import { Textarea } from "../ui/Textarea"
import { ITask } from "../types"

interface EditTaskProps {
    task: ITask
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const EditTask: FC<EditTaskProps> = ({ task, setModal }) => {
    const dispatch = useAppDispatch()
    const [name, setName] = useState<string>(task.name)
    const [category, setCategory] = useState<number>(task.category.id)
    const [description, setDescription] = useState<string>(task.description)

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (name === "") return
        dispatch(updateTaskById({ id: task.id, name, description, category }))
        setModal(false)
    }

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
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
