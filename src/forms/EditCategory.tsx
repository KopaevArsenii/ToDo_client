/* VENDOR */
import React, { FC, useState } from "react"
import { useAppDispatch } from "../redux/hooks"

/* APPLICATION */
import { updateCategoryById } from "../features/categoriesSlice"
import { Input } from "../ui/Input"
import { Textarea } from "../ui/Textarea"
import { Category } from "../types"
import { toast } from "react-toastify"

interface EditCategoryProps {
    category: Category
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const EditCategory: FC<EditCategoryProps> = ({ category, setModal }) => {
    const dispatch = useAppDispatch()
    const [name, setName] = useState<string>(category.name)
    const [description, setDescription] = useState<string>(category.description)

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (name === "" || description === "") {
            toast.error("Fill all field")
            return
        }
        dispatch(updateCategoryById({ id: category.id, name, description }))
        setModal(false)
    }

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
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
                required
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
