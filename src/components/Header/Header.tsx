/* VENDOR */
import { useState } from "react";
import {NavLink, useLocation} from "react-router-dom";

/* APPLICATION */
import "./Header.css";
import { CreateItem } from "../../forms/CreateItem";

export const Header = () => {
  const { pathname } = useLocation(),
    isCategories = pathname.includes("categories"),
    [createModalActive, setCreateModalActive] = useState<boolean>(false);
  const handleSwitchCreateModal = (e: React.MouseEvent<HTMLButtonElement>) => {
      setCreateModalActive(prev => !prev)
  }

  return (
    <header className="header">
      <h1 className="header-title">ToDo List</h1>
      <nav className="header-nav">
          <NavLink to={"/tasks"} className={({ isActive}) => isActive ? "header-nav-item header-nav-item-active" : "header-nav-item"}>Задачи</NavLink>
          <NavLink to={"/categories"} className={({ isActive}) => isActive ? "header-nav-item header-nav-item-active" : "header-nav-item"}>Категории</NavLink>
      </nav>
      <button
        className="header-button"
        onClick={handleSwitchCreateModal}
      >
        {isCategories ? "Добавить категорию" : "Добавить задачу"}
      </button>
      <CreateItem
        active={createModalActive}
        setActive={setCreateModalActive}
      />
    </header>
  );
};
