/* VENDOR */
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"

/* APPLICATION */
import { tasksRemoved, tasksClearedCategories } from "../features/tasksSlice"
import { categoriesRemoved } from "../features/categoriesSlice"
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
            dispatch(categoriesRemoved(item.id))
            dispatch(tasksClearedCategories(item.id))
        } else {
            dispatch(tasksRemoved(item.id))
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
