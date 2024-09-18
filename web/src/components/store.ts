import { create } from "zustand";
interface IObjectKeys {
    [key: string]: string | number | boolean;
}
export interface IProduct extends IObjectKeys {
    id: number
    name: string
    price: number
    stock: number
    available: boolean
    code: string
}

export interface IStore {
    products: IProduct[]
    isLoading: boolean
    setIsLoading: (isLoading: boolean) => void
    updateProduct: (product: IProduct) => void
    createProduct: (product: IProduct) => void
    deleteProduct: (product: IProduct) => void
    changeAvailibility: (id: number) => void
    setProducts: (products: IProduct[]) => void
}

export const useProductStore = create<IStore>((set) => ({
    products: [],
    isLoading: false,
    setIsLoading: (isLoading) => (set({ isLoading: isLoading })),
    updateProduct: (product) => set((state) => {
        const index = state.products.findIndex(i => i.id === product.id)

        state.products[index] = product
        return { products: [...state.products] }
    }),
    createProduct: (product) => set((state) => ({ products: [product, ...state.products] })),
    changeAvailibility: (id) => set((state) => {
        const products = state.products.map(i => {
            if (i.id === id) {
                i.available = !i.available
                if (i.available) {
                    i.stock = 1
                } else {
                    i.stock = 0
                }
            }
            return i
        })
        return { products: [...products] }
    }),
    deleteProduct: (product) => set((state) => ({ products: [...state.products.filter(i => i.id !== product.id)] })),
    setProducts: (products: IProduct[]) => set({ products: products })
}))