import { Router } from "express";
import { createProductController } from "../controllers/create-product.controller";

const productRouter = Router();

productRouter.post("/", async (req, res) => {
  createProductController(req, res);
});

export { productRouter };
