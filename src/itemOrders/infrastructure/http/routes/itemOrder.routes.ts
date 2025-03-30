import { Router } from "express";
import { CreateItemOrderController } from "../controller/create-itemOrder.controller";
import { ListAllItemOrderController } from "../controller/listAll-itemOrder.controller";
import { UpdateItemOrderController } from "../controller/update-client.controller";
import { GeItemOrderController } from "../controller/get-itemOrder.controller";
import { DeleteItemOrderController } from "../controller/delete-itemOrder.controller";

const itemOrderRouter = Router();

itemOrderRouter.post("/", async (req, res) => {
  CreateItemOrderController(req, res);
});

itemOrderRouter.get("/", async (req, res) => {
  ListAllItemOrderController(req, res);
});

itemOrderRouter.put("/:id", async (req, res) => {
  UpdateItemOrderController(req, res);
});

itemOrderRouter.get("/:id", async (req, res) => {
  GeItemOrderController(req, res);
});

itemOrderRouter.delete("/:id", async (req, res) => {
  DeleteItemOrderController(req, res);
});

export { itemOrderRouter };
