import { Router } from "express";
import { CreateClientController } from "../controllers/create-client.controller";

const clientRouter = Router()

clientRouter.post('/', async (req, res) => {
    CreateClientController(req, res)
})


export { clientRouter }