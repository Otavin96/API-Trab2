import { Router } from "express";
import { CreateOrderController } from "../controller/create-order.controller";
import { ListAllOrderController } from "../controller/listAll-order.controller";
import { UpdateOrderController } from "../controller/update-order.controller";
import { GetOrderController } from "../controller/get-order.controller";
import { DeleteOrderController } from "../controller/delete-order.controller";

const orderRoutes = Router();

orderRoutes.post("/", async (req, res) => {
  CreateOrderController(req, res);
});

orderRoutes.get("/", async (req, res) => {
  ListAllOrderController(req, res);
});

orderRoutes.get("/:id", async (req, res) => {
  GetOrderController(req, res);
});

orderRoutes.delete("/:id", async (req, res) => {
  DeleteOrderController(req, res);
});

orderRoutes.put("/:id", async (req, res) => {
  UpdateOrderController(req, res);
});

export { orderRoutes };
