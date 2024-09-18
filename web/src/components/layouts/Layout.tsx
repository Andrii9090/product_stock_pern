import { Outlet } from 'react-router-dom'
import { useProductStore } from '../store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Layout = () => {
    const isLoading = useProductStore((state) => state.isLoading)

    return (
        <>
            {isLoading && (
                <div className="w-full absolute top-0">
                    <div className="h-0.5 w-full bg-fuchsia-100 overflow-hidden">
                        <div className="progress w-full h-full bg-fuchsia-500 left-right"></div>
                    </div>
                </div>
            )}
            <div className="m-auto max-w-6xl bg-slate-50 rounded-md ">
                <Outlet />
                <ToastContainer />
            </div>
        </>
    )
}

export default Layout
