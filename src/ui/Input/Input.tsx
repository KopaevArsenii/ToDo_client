import important from "../../icons/important.svg";
import "./Input.css"

interface InputProps {
  value: string;
  label: string;
  placeholder: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  size?: string;
}

export const Input: React.FC<InputProps> = ({ value, label, placeholder, setValue, size, }) => {
  return (
    <div
      className={
        size === "large" ? "modalinput-wrapper large" : "modalinput-wrapper"
      }
    >
      <input
        id="modalinput"
        className="modalinput"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <img src={important} alt="important" className="modalinput-icon" />
      <label htmlFor="modalinput">{label}</label>
    </div>
  );
};
