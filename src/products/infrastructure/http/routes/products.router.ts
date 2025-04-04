import { Router } from "express";
import { createProductController } from "../controllers/create-product.controller";
import { listAllProductController } from "../controllers/listAll-product.controller";
import { getProductController } from "../controllers/get-product.controller";
import { updateProductController } from "../controllers/update-product.controller";
import { deleteProductController } from "../controllers/delete-product.controller";
import { isAuth } from "@/common/infrastructure/http/middlewares/isAuth";

const productRouter = Router();

productRouter.post("/", isAuth, async (req, res) => {
  createProductController(req, res);
});

productRouter.get("/", isAuth, async (req, res) => {
  listAllProductController(req, res);
});

productRouter.get("/:id", isAuth, async (req, res) => {
  getProductController(req, res);
});

productRouter.put("/:id", isAuth, async (req, res) => {
  updateProductController(req, res);
});

productRouter.delete("/:id", isAuth, async (req, res) => {
  deleteProductController(req, res);
});

export { productRouter };
