import { Router } from "express";
import { CreatePaymentController } from "@/payments/infrastructure/http/controller/create-payment.controller";
import { getPaymentController } from "../controller/get-payment.controller";
import { listAllPaymentController } from "../controller/listAll-payment.controller";
import { deletePaymentController } from "../controller/delete-payment.controller";
import { updatePaymentController } from "../controller/update-payment.controller";

const paymentRouter = Router();

paymentRouter.post("/", async (req, res) => {
  await CreatePaymentController(req, res);
});

paymentRouter.get("/:id", async (req, res) => {
  await getPaymentController(req, res);
});

paymentRouter.get("/", async (req, res) => {
  await listAllPaymentController(req, res);
});

paymentRouter.put("/:id", async (req, res) => {
  await updatePaymentController(req, res);
});

paymentRouter.delete("/:id", async (req, res) => {
  await deletePaymentController(req, res);
});

export { paymentRouter };
