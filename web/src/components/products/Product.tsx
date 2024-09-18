import { FC, useCallback } from 'react'
import { IProduct, useProductStore } from '../store'
import {
    deleteProductRepository,
    updateProductRepository,
} from '../../repository'
import { toast } from 'react-toastify'
type Props = {
    product: IProduct
}

export const Product: FC<Props> = ({ product }) => {
    const toastDelete = () =>
        toast('El producto ha sido eliminado!', { delay: 200 })
    const { updateProduct, changeAvailibility, deleteProduct, setIsLoading } =
        useProductStore((state) => state)
    const onChangeHandler = useCallback((name: string, value: string) => {
        setIsLoading(true)
        product[name] = value
        updateProductRepository(product)
            .then((data) => {
                if (!data.error) {
                    updateProduct(product)
                }
            })
            .finally(() => setIsLoading(false))
    }, [])

    const changeAvailibilityHandler = useCallback(() => {
        setIsLoading(true)
        updateProductRepository(product)
            .then((data) => {
                if (!data.error) changeAvailibility(product.id)
            })
            .finally(() => setIsLoading(false))
    }, [])

    const deleteProductHandler = useCallback(() => {
        setIsLoading(true)
        deleteProductRepository(product.id)
            .then((erorr) => {
                if (!erorr) {
                    deleteProduct(product)
                    toastDelete()
                }
            })
            .finally(() => setIsLoading(false))
    }, [])

    return (
        <tr className="border-b dark:border-neutral-600">
            <th scope="row" className="px-6 py-4">
                <input
                    type="text"
                    name="name"
                    className="w-full text-center border-b border-transparent focus:outline-none focus:border-b focus:border-fuchsia-300"
                    value={product.name}
                    onChange={(e) =>
                        onChangeHandler(e.target.name, e.target.value)
                    }
                />
            </th>
            <td className="px-6 py-4">
                <input
                    type="number"
                    name="stock"
                    min={0}
                    className="border-b text-center border-transparent focus:outline-none focus:border-b focus:border-fuchsia-300"
                    value={product.stock}
                    onChange={(e) =>
                        onChangeHandler(e.target.name, e.target.value)
                    }
                />
            </td>
            <td className="px-6 py-4">
                <input
                    type="number"
                    name="price"
                    min={0}
                    step={0.1}
                    className="border-b text-center border-transparent focus:outline-none focus:border-b focus:border-fuchsia-300"
                    value={product.price}
                    onChange={(e) =>
                        onChangeHandler(e.target.name, e.target.value)
                    }
                />
            </td>
            <td className="px-6 py-4">
                <input
                    type="text"
                    name="code"
                    className="w-full text-center border-b border-transparent focus:outline-none focus:border-b focus:border-fuchsia-300"
                    value={product.code}
                    onChange={(e) =>
                        onChangeHandler(e.target.name, e.target.value)
                    }
                />
            </td>
            <td className="px-6 py-4">
                {product.available && (
                    <button
                        className="bg-green-500 text-white p-2 rounded-md"
                        onClick={changeAvailibilityHandler}
                    >
                        En stock
                    </button>
                )}
                {!product.available && (
                    <button
                        className="bg-red-500 text-white p-2 rounded-md"
                        onClick={changeAvailibilityHandler}
                    >
                        Agotado
                    </button>
                )}
            </td>
            <td className="px-6 py-4">
                <button
                    className="bg-orange-500 text-white font-bold rounded-md p-3"
                    onClick={() => {
                        const isDelete = confirm('¿Borrar producto?')
                        if (isDelete) {
                            deleteProductHandler()
                        }
                    }}
                >
                    Borrar
                </button>
            </td>
        </tr>
    )
}
