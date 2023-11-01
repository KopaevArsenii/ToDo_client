/* VENDOR */
import React, { FC, useState } from "react"
import { useSelector } from "react-redux"

/* APPLICATION */
import { getAllCategories } from "../features/categoriesSlice"
import { Modal } from "./Modal"
import { RemoveItem } from "../forms/RemoveItem"
import edit from "../icons/edit.svg"
import remove from "../icons/remove.svg"
import Checkbox from "../ui/Checkbox"
import { setTaskDone } from "../features/tasksSlice"
import { useAppDispatch } from "../redux/hooks"
import EditTask from "../forms/EditTask"

interface TaskListItemProps {
    item: {
        id: string
        name: string
        description: string
        category: string
        done: boolean
    }
}

const TaskListItem: FC<TaskListItemProps> = ({ item }) => {
    const dispatch = useAppDispatch()
    const categories = useSelector(getAllCategories)
    const [editModalActive, setEditModalActive] = useState<boolean>(false)
    const [removeModalActive, setRemoveModalActive] = useState<boolean>(false)

    const handleSwitchEditModal = (e: React.MouseEvent<HTMLButtonElement>) =>
        setEditModalActive((prev) => !prev)
    const handleSwitchRemoveModal = (e: React.MouseEvent<HTMLButtonElement>) =>
        setRemoveModalActive((prev) => !prev)
    const handleSwitchTaskDone = (
        e: React.MouseEvent<HTMLButtonElement>,
        id: string,
    ) => {
        dispatch(setTaskDone(id))
    }

    const categoryName = categories.find(
        (category) => category.id === item.category,
    )?.name

    return (
        <>
            <Modal
                name={"Редактирование"}
                active={editModalActive}
                setActive={setEditModalActive}
                buttonUnavailable
            >
                <EditTask item={item} setModal={setEditModalActive} />
            </Modal>

            <Modal
                name={"Удаление"}
                active={removeModalActive}
                setActive={setRemoveModalActive}
            >
                <RemoveItem setModal={setRemoveModalActive} item={item} />
            </Modal>

            <li
                className={`w-full py-[30px] px-[40px] flex justify-between border border-slate-200 rounded-[30px] ${
                    item.done ? "text-black/30" : ""
                }`}
            >
                <div className={"flex flex-col gap-[20px]"}>
                    <div className={"flex gap-[20px] items-center"}>
                        <div className={"font-medium text-[22px]"}>
                            {item.name}
                        </div>
                        {categoryName ? (
                            <div className="px-[25px] py-[5px] rounded-[6px] border border-slate-200 text-[14px]">
                                {categoryName}
                            </div>
                        ) : null}
                    </div>
                    {item.description ? (
                        <div
                            className={`${
                                item.done ? "text-zinc-400/50" : "text-zinc-400"
                            } text-[18px]`}
                        >
                            {item.description}
                        </div>
                    ) : null}
                </div>
                <div className={"flex gap-[20px] items-center"}>
                    <Checkbox
                        isChecked={item.done}
                        onClick={(e) => handleSwitchTaskDone(e, item.id)}
                    />
                    <button
                        onClick={handleSwitchEditModal}
                        className="border border-slate-200 hover:border-indigo-500 rounded-[8px] w-[40px] h-[40px]"
                    >
                        <img className="m-auto" src={edit} alt={"edit"} />
                    </button>
                    <button
                        onClick={handleSwitchRemoveModal}
                        className="border border-slate-200 hover:border-indigo-500 rounded-[8px] w-[40px] h-[40px]"
                    >
                        <img className="m-auto" src={remove} alt={"remove"} />
                    </button>
                </div>
            </li>
        </>
    )
}

export default TaskListItem
