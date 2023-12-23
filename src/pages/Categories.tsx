/* VENDOR */
import { useAppDispatch, useAppSelector } from "../redux/hooks"

/* APPLICATION */
import CategoryListItem from "../components/CategoryListItem"
import { fetchCategories, getAllCategories } from "../features/categoriesSlice"
import NothingFound from "../components/NothingFound"
import { useEffect } from "react"

export const Categories = () => {
    const dispatch = useAppDispatch()
    const categories = useAppSelector(getAllCategories)

    useEffect(() => {
        dispatch(fetchCategories())
    }, [])

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
