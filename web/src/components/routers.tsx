import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import { Products } from './products/Products'
import { Error } from './Error'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                index: true,
                element: <Products />,
            },
        ],
    },
    {
        path: '*',
        element: <Error />,
    },
])

export default router
