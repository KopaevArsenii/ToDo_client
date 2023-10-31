/* VENDOR */
import { useSelector } from "react-redux"

/* APPLICATION */
import { ListItem } from "./ListItem"
import { getAllTasks } from "../../features/tasksSlice"

export const Tasks: React.FC = () => {
    const tasks = useSelector(getAllTasks)

    return (
        <ul>
            {tasks.map((task) => (
                <ListItem key={task.id} item={task} />
            ))}
        </ul>
    )
}
