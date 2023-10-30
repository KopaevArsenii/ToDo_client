import important from "../../icons/important.svg";

interface InputProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  size?: string;
}

export const Input: React.FC<InputProps> = ({
  value,
  setValue,
  size,
}) => {
  return (
    <div
      className={
        size === "large" ? "modalinput-wrapper large" : "modalinput-wrapper"
      }
    >
      <input
        id="modalinput"
        className="modalinput"
        placeholder="Введите имя задачи/категории"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <img src={important} alt="important" className="modalinput-icon" />
      <label htmlFor="modalinput">Имя</label>
    </div>
  );
};

