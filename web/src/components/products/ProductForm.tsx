import { useForm } from 'react-hook-form'
import { useProductStore } from '../store'
import { createProductRepository } from '../../repository'

const registerOptions = {
    name: {
        required: 'Nombre es obligatorio',
    },
    price: {
        required: 'Precio es obligatorio. Precio tiene que superar a 0',
        min: 0,
    },
    code: {
        required: 'Barcode es obligatorio',
    },
    stock: {
        required: 'Stok es obligatorio, no se puede menos de 0',
        min: 0,
    },
}

export const ProductForm = () => {
    const {
        handleSubmit,
        formState: { errors },
        register,
        reset,
    } = useForm()
    const setIsLoading = useProductStore((state) => state.setIsLoading)
    const createProduct = useProductStore((state) => state.createProduct)

    const onSubmitHandler = (data) => {
        setIsLoading(true)
        createProductRepository(data)
            .then((product) => {
                createProduct(product.data!)
                reset()
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="flex flex-col bg-white p-4 mb-3 rounded-md"
        >
            <div className="flex">
                <div className="flex flex-col flex-auto">
                    <div className="flex flex-col justify-between items-center m-3">
                        <div className="flex justify-between items-center w-full">
                            <label htmlFor="name" className="mr-3 w-1/4">
                                Nombre
                            </label>
                            <input
                                type="text"
                                className={`p-2 border rounded-md w-3/4 ${
                                    errors.name ? 'bg-red-100' : ''
                                }`}
                                {...register('name', registerOptions.name)}
                            />
                        </div>
                        <span className="text-red-300 text-xs">
                            {errors.name?.message?.toString()}
                        </span>
                    </div>
                    <div className="flex flex-col justify-between items-center m-3">
                        <div className="flex justify-between items-center w-full">
                            <label htmlFor="price" className="mr-3 w-1/4">
                                Precio
                            </label>
                            <input
                                type="number"
                                min={0}
                                {...register('price', registerOptions.price)}
                                className={`p-2 w-3/4 border rounded-md ${
                                    errors.price ? 'bg-red-100' : ''
                                }`}
                            />
                        </div>
                        <span className="text-red-300 text-xs">
                            {errors.name?.message?.toString()}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col flex-auto">
                    <div className="flex flex-col justify-between items-center m-3">
                        <div className="flex justify-between item-center w-full">
                            <label htmlFor="stock" className="mr-3 w-1/4">
                                Candidatos en stock
                            </label>
                            <input
                                type="number"
                                min={0}
                                {...register('stock', registerOptions.stock)}
                                className={`p-2 border rounded-md w-3/4 ${
                                    errors.stock ? 'bg-red-100' : ''
                                }`}
                            />
                        </div>
                        <span className="text-red-300 text-xs">
                            {errors.stock?.message?.toString()}
                        </span>
                    </div>
                    <div className="flex flex-col justify-between items-center m-3">
                        <div className="flex justify-between items-center w-full">
                            <label htmlFor="code" className="mr-3 w-1/4">
                                Barcode
                            </label>
                            <input
                                type="text"
                                {...register('code', registerOptions.code)}
                                className={`p-2 border rounded-md w-3/4 ${
                                    errors.code ? 'bg-red-100' : ''
                                }`}
                            />
                        </div>
                        <span className="text-red-300 text-xs">
                            {errors.code?.message?.toString()}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex justify-start">
                <button className="pr-3 pl-3 pb-2 pt-2 bg-fuchsia-600 rounded-md text-white font-semibold hover:bg-fuchsia-500">
                    Añadir
                </button>
            </div>
        </form>
    )
}
