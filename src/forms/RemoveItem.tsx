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
}

export const RemoveItem: React.FC<ModalRemoveItemProps> = ({ item }) => {
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
    }

    return (
        <form onSubmit={onSubmit}>
            <div>{text}</div>
            <button type="submit">Подтвердить</button>
            <button onClick={() => window.location.reload()} type="button">
                Отмена
            </button>
        </form>
        // <Modal item={item} active={active} setActive={setActive}>
        //   <ModalHeader setActive={setActive} title={"Удаление задачи"} />
        //   <ModalText text={text} />
        //   <ModalFooter
        //     setActive={setActive}
        //     submitBtnText="Да"
        //     onSubmit={
        //       isCategories
        //         ? () => {
        //             dispatch(categoriesRemoved(item.id));
        //             dispatch(tasksClearedCategories(item.id));
        //           }
        //         : () => dispatch(tasksRemoved(item.id))
        //     }
        //   />
        // </Modal>
    )
}
