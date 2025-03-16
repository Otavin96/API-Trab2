import { Router } from "express";
import { createCategoryController } from "../controllers/create-category.controller";

const categoryRouter = Router();

categoryRouter.post("/", createCategoryController);

export { categoryRouter };
