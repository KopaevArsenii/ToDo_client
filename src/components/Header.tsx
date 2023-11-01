/* VENDOR */
import { FC, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"

/* APPLICATION */
import Modal from "./Modal"
import logo from "../icons/logo.svg"
import CreateCategory from "../forms/CreateCategory"
import CreateTask from "../forms/CreateTask"

export const Header: FC = () => {
    const { pathname } = useLocation()
    const [createModalActive, setCreateModalActive] = useState<boolean>(false)

    const isCategories = pathname.includes("categories")
    const handleSwitchCreateModal = (
        e: React.MouseEvent<HTMLButtonElement>,
    ) => {
        setCreateModalActive((prev) => !prev)
    }

    return (
        <>
            <header className="w-full flex max-w-[1440px] py-[30px] mx-auto items-center gap-[100px]">
                <img className="w-[60px] h-[60px]" src={logo} alt="logo" />
                <nav className="w-full flex gap-[30px]">
                    <NavLink
                        to={"/tasks"}
                        className={({ isActive }) =>
                            isActive
                                ? "font-medium text-[22px]"
                                : " font-normal text-[22px]"
                        }
                    >
                        Задачи
                    </NavLink>
                    <NavLink
                        to={"/categories"}
                        className={({ isActive }) =>
                            isActive
                                ? "font-medium text-[22px]"
                                : "font-normal text-[22px]"
                        }
                    >
                        Категории
                    </NavLink>
                </nav>
                <button
                    className="button button-indigo h-[64px] max-w-[300px]"
                    onClick={handleSwitchCreateModal}
                >
                    {isCategories ? "Добавить категорию" : "Добавить задачу"}
                </button>
                <Modal
                    name={"Создание"}
                    active={createModalActive}
                    setActive={setCreateModalActive}
                >
                    {pathname.includes("categories") ? (
                        <CreateCategory setModal={setCreateModalActive} />
                    ) : (
                        <CreateTask setModal={setCreateModalActive} />
                    )}
                </Modal>
            </header>
            <div className="h-[1px] bg-slate-200 w-full"></div>
        </>
    )
}
