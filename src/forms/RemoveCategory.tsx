/* VENDOR */
import { useDispatch } from "react-redux"

/* APPLICATION */
import { clearTaskCategory } from "../features/tasksSlice"
import { deleteCategory } from "../features/categoriesSlice"
import React from "react"

interface ModalRemoveItemProps {
    item: {
        id: string
        name: string
        description: string
    }
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const RemoveCategory: React.FC<ModalRemoveItemProps> = ({ item, setModal }) => {
    const dispatch = useDispatch()
    const text = `Вы уверены, что хотите удалить категорию "${item.name}"?`

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        dispatch(deleteCategory(item.id))
        dispatch(clearTaskCategory(item.id))
        setModal(false)
    }

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        setModal(false)
    }

    return (
        <form className="flex flex-col gap-[30px]" onSubmit={onSubmit}>
            <div className="text-[22px]">{text}</div>
            <div className="flex gap-[30px] h-[64px]">
                <button
                    className="button button-default"
                    onClick={handleCancel}
                    type="button"
                >
                    Отмена
                </button>
                <button className="button button-red" type="submit">
                    Подтвердить
                </button>
            </div>
        </form>
    )
}

export default RemoveCategory
