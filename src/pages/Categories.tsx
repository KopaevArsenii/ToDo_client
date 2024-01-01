/* VENDOR */
import { useAppDispatch, useAppSelector } from "../redux/hooks"

/* APPLICATION */
import CategoryListItem from "../components/CategoryListItem"
import {
    fetchCategories,
    getCategoriesState,
} from "../features/categoriesSlice"
import NothingFound from "../components/NothingFound"
import { useEffect, useRef } from "react"
import { Id, toast } from "react-toastify"

export const Categories = () => {
    const dispatch = useAppDispatch()
    const { categories, loading, error } = useAppSelector(getCategoriesState)
    const toastId = useRef<Id>()

    useEffect(() => {
        dispatch(fetchCategories())
    }, [])

    useEffect(() => {
        if (loading) {
            toastId.current = toast.loading("Loading")
        } else {
            toast.dismiss(toastId.current)
        }
    }, [loading])

    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [error])

    return (
        <ul className="max-w-[1440px] mx-auto bg-white flex flex-col gap-[30px] py-[30px]">
            {categories.map((category) => (
                <CategoryListItem key={category.id} category={category} />
            ))}
            {categories.length === 0 && (
                <NothingFound text="No categories yet. Create!" />
            )}
        </ul>
    )
}
