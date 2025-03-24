import { Router } from "express";
import { CreateClientController } from "../controllers/create-client.controller";
import { getClientController } from "../controllers/get-client.controller";
import { listAllClientController } from "../controllers/listAll-client.controller";
import { deleteClientController } from "../controllers/delete-client.controller";
import { updateClientController } from "../controllers/update-client.controller";

const clientRouter = Router();

clientRouter.post("/", async (req, res) => {
  CreateClientController(req, res);
});

clientRouter.get("/", async (req, res) => {
  listAllClientController(req, res);
});

clientRouter.get("/:id", async (req, res) => {
  getClientController(req, res);
});

clientRouter.put("/:id", async (req, res) => {
  updateClientController(req, res);
});

clientRouter.delete("/:id", async (req, res) => {
  deleteClientController(req, res);
});

export { clientRouter };
