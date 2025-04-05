import { Router } from "express";
import { CreateOrderController } from "../controller/create-order.controller";
import { ListAllOrderController } from "../controller/listAll-order.controller";
import { UpdateOrderController } from "../controller/update-order.controller";
import { GetOrderController } from "../controller/get-order.controller";
import { DeleteOrderController } from "../controller/delete-order.controller";
import { isAuth } from "@/common/infrastructure/http/middlewares/isAuth";

const orderRoutes = Router();

orderRoutes.post("/", isAuth, async (req, res) => {
  CreateOrderController(req, res);
});

orderRoutes.get("/", isAuth, async (req, res) => {
  ListAllOrderController(req, res);
});

orderRoutes.get("/:id", isAuth, async (req, res) => {
  GetOrderController(req, res);
});

orderRoutes.delete("/:id", isAuth, async (req, res) => {
  DeleteOrderController(req, res);
});

orderRoutes.put("/:id", isAuth, async (req, res) => {
  UpdateOrderController(req, res);
});

export { orderRoutes };
