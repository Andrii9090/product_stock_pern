import { useCallback, useEffect } from 'react'
import { useProductStore } from '../store'
import { Product } from './Product'
import { ProductForm } from './ProductForm'
import { getAll } from '../../repository'
export const Products = () => {
    const products = useProductStore((state) => state.products)
    const setProducts = useProductStore((state) => state.setProducts)
    const setIsLoading = useProductStore((state) => state.setIsLoading)

    const loadProduct = useCallback(() => {
        setIsLoading(true)
        getAll()
            .then((products) => setProducts(products))
            .finally(() => setIsLoading(false))
    }, [])

    useEffect(() => {
        loadProduct()
    }, [])

    const searchHandler = useCallback((e) => {
        if (e.target.value.trim() !== '') {
            console.log(e.target.value.trim())

            setProducts(
                products.filter((i) => {
                    if (
                        i.name
                            .toLowerCase()
                            .includes(e.target.value.trim().toLowerCase()) ||
                        i.code
                            .toLowerCase()
                            .includes(e.target.value.trim().toLowerCase())
                    )
                        return true
                    return false
                })
            )
        } else {
            loadProduct()
        }
    }, [])

    return (
        <div className="flex-col flex p-4">
            <div className="flex justify-between p-3 border-b-gray-200 border-b mb-2 ">
                <h3 className="text-4xl">Almacen</h3>
                <div className="flex">
                    <input
                        type="text"
                        className="p-3 focus:outline-none focus:bg-slate-100 border-transparent rounded-xl bg-slate-50"
                        placeholder="Buscador"
                        onChange={searchHandler}
                    />
                </div>
            </div>

            <ProductForm />
            {products.length > 0 && (
                <table className="min-w-full text-left text-sm whitespace-nowrap bg-white rounded-lg">
                    <thead className="uppercase tracking-wider border-b-2 dark:border-neutral-600">
                        <tr>
                            <th scope="col" className="px-6 py-4 text-center">
                                Nombre
                            </th>
                            <th scope="col" className="px-6 py-4 text-center">
                                Stock
                            </th>
                            <th scope="col" className="px-6 py-4 text-center">
                                Precio
                            </th>
                            <th scope="col" className="px-6 py-4 text-center">
                                Barcode
                            </th>
                            <th scope="col" className="px-6 py-4 text-center">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-4 text-center">
                                acción
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => (
                            <Product product={product} key={product.id} />
                        ))}
                    </tbody>
                </table>
            )}
            {products.length === 0 && (
                <div className="m-auto text-blue-700 font-bold text-2xl">
                    Crea tu primer producto en tu stocks
                </div>
            )}
        </div>
    )
}
