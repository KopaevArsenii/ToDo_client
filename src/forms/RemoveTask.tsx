/* VENDOR */
import { useDispatch } from "react-redux"

/* APPLICATION */
import { deleteTask } from "../features/tasksSlice"
import React from "react"

interface ModalRemoveItemProps {
    item: {
        id: string
        name: string
        description: string
        category: string
        done: boolean
    }
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const RemoveTask: React.FC<ModalRemoveItemProps> = ({ item, setModal }) => {
    const dispatch = useDispatch()
    const text = `Вы уверены, что хотите удалить задачу "${item.name}"?`

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        dispatch(deleteTask(item.id))
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

export default RemoveTask
