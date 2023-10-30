/* VENDOR */
import { useState } from "react";
import { useSelector } from "react-redux";

/* APPLICATION */
import down from "../../icons/down.svg";
import { selectAllCategories } from "../../features/categoriesSlice";

interface SelectProps {
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const Select: React.FC<SelectProps> = ({ value, setValue, }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const options = useSelector(selectAllCategories);

  return (
    <div className="dropdown" onClick={() => setIsActive(!isActive)}>
      <span className="dropdown-label">Категория</span>
      <div className={value ? "dropdown-btn" : "dropdown-btn placeholder"}>
        {options.find((option) => option.id === value)?.name ||
          "Выберите категорию"}
        <img src={down} alt="open dropdown" />
      </div>
      {isActive && (
        <div className="dropdown-content">
          {options.map((option) => (
            <div
              className="dropdown-item"
              onClick={() => {
                setValue(option.id);
                setIsActive(false);
              }}
              key={option.id}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
