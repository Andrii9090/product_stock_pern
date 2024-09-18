import { Request, Response } from "express";
import Product from "../models/product.model";
import logger from "../config/logger";

export const createProduct = (req: Request, res: Response) => {
    console.log(req.body)
    Product.create(req.body)
        .then(data => {
            res.json({ error: false, msg: '', data })
        })
        .catch((e) => {
            logger.error(e)
            res.json({
                error: true,
                msg: 'Error'
            })
        })
}

export const updateProduct = (req: Request, res: Response) => {
    const id = req.params.id
    Product.update(req.body, { where: { id } })
        .then((data) => res.json({ error: false, msg: '', data }))
        .catch((e) => {
            console.log(e);

            res.json({ error: true, msg: "Didn't update" })
        })
}

export const deleteProduct = (req: Request, res: Response) => {
    const id = req.params.id

    Product.findByPk(id)
        .then((product) => {
            product?.destroy()
                .then(() => res.json({ error: false }))
                .catch((e) => {
                    logger.error(e)
                    res.json({ error: true, msg: "Didn't remove" })
                })
        })
}

export const getAll = (req: Request, res: Response) => {
    Product.findAll({ order: [['id', 'desc']] })
        .then((data) => {
            res.json({ error: false, data })
        })
        .catch((e) => {
            logger.error(e)
            res.json({ error: true, msg: "The error occurred while processing the request" })
        })
}
