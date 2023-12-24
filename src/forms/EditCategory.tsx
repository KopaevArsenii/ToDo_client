/* VENDOR */
import React, { FC, useState } from "react"
import { useAppDispatch } from "../redux/hooks"

/* APPLICATION */
import { updateCategoryById } from "../features/categoriesSlice"
import { Input } from "../ui/Input"
import { Textarea } from "../ui/Textarea"
import { ICategory } from "../types"

interface EditCategoryProps {
    category: ICategory
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const EditCategory: FC<EditCategoryProps> = ({ category, setModal }) => {
    const dispatch = useAppDispatch()
    const [name, setName] = useState<string>(category.name)
    const [description, setDescription] = useState<string>(category.description)

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (name === "") return
        dispatch(updateCategoryById({ id: category.id, name, description }))
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
