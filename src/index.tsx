/* VENDOR */
import React from "react"
import { BrowserRouter } from "react-router-dom"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import store from "./redux/store"

/* APPLICATION */
import App from "./components/App"
import "./index.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const container = document.getElementById("root")!
const root = createRoot(container)

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
)
