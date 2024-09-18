import { Router } from "express";
import { createProduct, deleteProduct, getAll, updateProduct } from "../handlers/product.handler";

const router = Router();

router.get("/", getAll)

router.post("/", createProduct)

router.put("/:id", updateProduct)

router.delete("/:id", deleteProduct)

export default router