import { Router } from "express";
import { createCategoryController } from "@/categories/infrastructure/http/controllers/create-category.controller";
import { getCategoryController } from "../controllers/get-category.controller";
import { listAllCategoryController } from "../controllers/listall-category.controller";
import { updateCategoryController } from "../controllers/update-category.controller";
import { deleteCategoryController } from "../controllers/delete-category.controller";
import { isAuth } from "@/common/infrastructure/http/middlewares/isAuth";

const categoriesRouter = Router();

categoriesRouter.post("/", isAuth, async (req, res) => {
  await createCategoryController(req, res);
});

categoriesRouter.get("/:id", isAuth, async (req, res) => {
  await getCategoryController(req, res);
});

categoriesRouter.get("/", isAuth, async (req, res) => {
  await listAllCategoryController(req, res);
});

categoriesRouter.put("/:id", isAuth, async (req, res) => {
  await updateCategoryController(req, res);
});

categoriesRouter.delete("/:id", isAuth, async (req, res) => {
  await deleteCategoryController(req, res);
});

export { categoriesRouter };
