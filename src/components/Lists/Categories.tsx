/* VENDOR */
import { useSelector } from "react-redux"

/* APPLICATION */
import { ListItem } from "./ListItem"
import { getAllCategories } from "../../features/categoriesSlice"

export const Categories = () => {
    const categories = useSelector(getAllCategories)

    return (
        <ul>
            {categories.map((category) => (
                <ListItem key={category.id} item={category} />
            ))}
        </ul>
    )
}
