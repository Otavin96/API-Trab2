import { Router } from "express";
import { CreateItemOrderController } from "../controller/create-itemOrder.controller";
import { ListAllItemOrderController } from "../controller/listAll-itemOrder.controller";
import { UpdateItemOrderController } from "../controller/update-client.controller";
import { GeItemOrderController } from "../controller/get-itemOrder.controller";
import { DeleteItemOrderController } from "../controller/delete-itemOrder.controller";
import { isAuth } from "@/common/infrastructure/http/middlewares/isAuth";

const itemOrderRouter = Router();

itemOrderRouter.post("/", isAuth, async (req, res) => {
  CreateItemOrderController(req, res);
});

itemOrderRouter.get("/", isAuth, async (req, res) => {
  ListAllItemOrderController(req, res);
});

itemOrderRouter.put("/:id", isAuth, async (req, res) => {
  UpdateItemOrderController(req, res);
});

itemOrderRouter.get("/:id", isAuth, async (req, res) => {
  GeItemOrderController(req, res);
});

itemOrderRouter.delete("/:id", isAuth, async (req, res) => {
  DeleteItemOrderController(req, res);
});

export { itemOrderRouter };
