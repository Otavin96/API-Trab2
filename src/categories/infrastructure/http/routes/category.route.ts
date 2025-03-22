import { Router } from "express";
import { createCategoryController } from "@/categories/infrastructure/http/controllers/create-category.controller";
import { getCategoryController } from "../controllers/get-category.controller";

const categoriesRouter = Router();

categoriesRouter.post("/", async (req, res) => {
  await createCategoryController(req, res);
});

categoriesRouter.get("/:id", async (req, res) => {
  await getCategoryController(req, res);
});

export { categoriesRouter };
