/* VENDOR */
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"

/* APPLICATION */
import { deleteTask, clearTaskCategory } from "../features/tasksSlice"
import { deleteCategory } from "../features/categoriesSlice"
import React from "react"

interface ModalRemoveItemProps {
    item: {
        id: string
        name: string
        description: string
        category?: string
    }
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const RemoveItem: React.FC<ModalRemoveItemProps> = ({
    item,
    setModal,
}) => {
    const dispatch = useDispatch(),
        { pathname } = useLocation(),
        isCategories = pathname.includes("categories"),
        text = `Вы уверены, что хотите удалить "${item.name}"?`

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if (isCategories) {
            dispatch(deleteCategory(item.id))
            dispatch(clearTaskCategory(item.id))
        } else {
            dispatch(deleteTask(item.id))
        }
        setModal(false)
    }

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        setModal(false)
    }

    return (
        <form onSubmit={onSubmit}>
            <div>{text}</div>
            <button type="submit">Подтвердить</button>
            <button onClick={handleCancel} type="button">
                Отмена
            </button>
        </form>
    )
}
