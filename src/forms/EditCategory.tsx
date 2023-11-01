import React, { FC, useState } from "react"
import { useDispatch } from "react-redux"

import { updateCategory } from "../features/categoriesSlice"
import { Input } from "../ui/Input"
import { Textarea } from "../ui/Textarea"

interface EditItemProps {
    item: {
        id: string
        name: string
        description: string
    }
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const EditCategory: FC<EditItemProps> = ({ item, setModal }) => {
    const dispatch = useDispatch()
    const [name, setName] = useState<string>(item.name)
    const [description, setDescription] = useState<string>(item.description)

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (name === "") return
        dispatch(updateCategory({ id: item.id, name, description }))
        setModal(false)
    }

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        setModal(false)
    }

    return (
        <form className="flex flex-col gap-[30px]" onSubmit={onSubmit}>
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

export default EditCategory
