/* VENDOR */
import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"

/* APPLICATION */
import { CreateItem } from "../forms/CreateItem"
import { Modal } from "./Modal"
import logo from "../icons/logo.svg"

export const Header = () => {
    const { pathname } = useLocation(),
        isCategories = pathname.includes("categories"),
        [createModalActive, setCreateModalActive] = useState<boolean>(false)
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
                    <CreateItem setModal={setCreateModalActive} />
                </Modal>
            </header>
            <div className="h-[1px] bg-slate-200 w-full"></div>
        </>
    )
}
