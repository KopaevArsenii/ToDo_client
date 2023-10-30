/* VENDOR */
import { useState } from "react";
import { useSelector } from "react-redux";

/* APPLICATION */
import edit from "../../icons/edit.svg";
import remove from "../../icons/remove.svg";
import { selectAllCategories } from "../../features/categoriesSlice";
import { EditItem } from "../../forms/EditItem";
import { RemoveItem } from "../../forms/RemoveItem";

interface ListItemProps {
  item: {
    id: string;
    name: string;
    description: string;
    category?: string;
  };
}

export const ListItem: React.FC<ListItemProps> = ({ item }) => {
  const categories = useSelector(selectAllCategories)
  const [editModalActive, setEditModalActive] = useState<boolean>(false)
  const [removeModalActive, setRemoveModalActive] = useState<boolean>(false)

  const handleSwitchEditModal = (e: React.MouseEvent<HTMLButtonElement>) => setEditModalActive(prev => !prev);
  const handleSwitchRemoveModal = (e: React.MouseEvent<HTMLButtonElement>) => setRemoveModalActive(prev => !prev);

  return (
    <>
      <li className="list-item">
        <div className="list-item-col1">
          <div className="list-item-col1-row1">
            <h3 className="list-item-col1-row1__title">{item.name}</h3>
            {item.category && (
              <span className="list-item-col1-row1__category">
                {categories.find((category) => category.id === item.category)?.name}
              </span>
            )}
          </div>
          <div className="list-item-col1-row2">{item.description}</div>
        </div>
        <div className="list-item-col2">
          <button
            className="list-item-col2__btn"
            onClick={handleSwitchEditModal}
          >
            <img src={edit} alt="edit" />
          </button>
          <button
            className="list-item-col2__btn"
            onClick={handleSwitchRemoveModal}
          >
            <img src={remove} alt="remove" />
          </button>
        </div>
        <EditItem
          item={item}
          active={editModalActive}
          setActive={setEditModalActive}
        />
        <RemoveItem
          item={item}
          active={removeModalActive}
          setActive={setRemoveModalActive}
        />
      </li>
    </>
  );
};
