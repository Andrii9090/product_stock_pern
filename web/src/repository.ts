import axios from "axios";
import { IProduct } from "./components/store";
import config from "./config";
interface IResponse {
    error: boolean
    data?: IProduct
    msg?: string
}

export const createProductRepository = async (product: IProduct): Promise<IResponse> => {
    return axios.post(config.baseUrl, product)
        .then(data => data.data)
}

export const getAll = async (): Promise<IProduct[]> => {
    return axios.get(config.baseUrl)
        .then(data => data.data.data)
}

export const deleteProductRepository = async (id: number): Promise<boolean> => {
    return axios.delete(config.baseUrl + id)
        .then(data => data.data.error)
}

export const updateProductRepository = async (product: IProduct): Promise<IProduct> => {
    return axios.put(config.baseUrl + product.id, product)
        .then((data) => data.data)
        .catch(e => console.log(e)
        )
}
