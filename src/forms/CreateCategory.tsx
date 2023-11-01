import React, { FC, useState } from "react"
import { useDispatch } from "react-redux"

import { addCategory } from "../features/categoriesSlice"
import { Input } from "../ui/Input"
import { Textarea } from "../ui/Textarea"

interface CreateCategoryProps {
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateCategory: FC<CreateCategoryProps> = ({ setModal }) => {
    const dispatch = useDispatch()
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    function clearForm() {
        setName("")
        setDescription("")
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (name === "") return
        dispatch(addCategory({ name, description }))
        clearForm()
        setModal(false)
    }

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        setModal(false)
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-[30px]">
            <Input
                value={name}
                label={"Название"}
                placeholder={"Введите название"}
                setValue={setName}
                required
            />
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

export default CreateCategory
