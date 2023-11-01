/* VENDOR */
import { useAppSelector } from "../redux/hooks"

/* APPLICATION */
import CategoryListItem from "../components/CategoryListItem"
import { getAllCategories } from "../features/categoriesSlice"
import NothingFound from "../components/NothingFound"

export const Categories = () => {
    const categories = useAppSelector(getAllCategories)

    return (
        <ul className="max-w-[1440px] mx-auto bg-white flex flex-col gap-[30px] py-[30px]">
            {categories.map((category) => (
                <CategoryListItem key={category.id} category={category} />
            ))}
            {categories.length === 0 && (
                <NothingFound text="Нет ни одной категории? Создайте!" />
            )}
        </ul>
    )
}
