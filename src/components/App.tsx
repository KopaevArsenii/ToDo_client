/* VENDOR */
import { FC } from "react"
import { Route, Routes, Navigate } from "react-router-dom"

/* APPLICATION */
import { Header } from "./Header"
import { Tasks } from "../pages/Tasks"
import { Categories } from "../pages/Categories"

const App: FC = () => {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="*" element={<Navigate to={"/tasks"} />} />
            </Routes>
        </div>
    )
}

export default App
