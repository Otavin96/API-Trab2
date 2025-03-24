import { Router } from "express";
import { createProductController } from "../controllers/create-product.controller";
import { listAllProductController } from "../controllers/listAll-product.controller";
import { getProductController } from "../controllers/get-product.controller";
import { updateProductController } from "../controllers/update-product.controller";
import { deleteProductController } from "../controllers/delete-product.controller";

const productRouter = Router();

productRouter.post("/", async (req, res) => {
  createProductController(req, res);
});

productRouter.get("/", async (req, res) => {
  listAllProductController(req, res);
});

productRouter.get("/:id", async (req, res) => {
  getProductController(req, res);
});

productRouter.put("/:id", async (req, res) => {
  updateProductController(req, res);
});

productRouter.delete("/:id", async (req, res) => {
  deleteProductController(req, res);
});

export { productRouter };
