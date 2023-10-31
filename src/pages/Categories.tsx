/* VENDOR */
import { useSelector } from "react-redux"

/* APPLICATION */
import { ListItem } from "../components/ListItem/ListItem"
import { getAllCategories } from "../features/categoriesSlice"

export const Categories = () => {
    const categories = useSelector(getAllCategories)

    return (
        <ul className="max-w-[1440px] mx-auto bg-white flex flex-col gap-[30px] mt-[60px]">
            {categories.map((category) => (
                <ListItem key={category.id} item={category} />
            ))}
        </ul>
    )
}
