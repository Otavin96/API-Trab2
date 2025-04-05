import { Router } from "express";
import { CreatePaymentController } from "@/payments/infrastructure/http/controller/create-payment.controller";
import { getPaymentController } from "../controller/get-payment.controller";
import { listAllPaymentController } from "../controller/listAll-payment.controller";
import { deletePaymentController } from "../controller/delete-payment.controller";
import { updatePaymentController } from "../controller/update-payment.controller";
import { isAuth } from "@/common/infrastructure/http/middlewares/isAuth";

const paymentRouter = Router();

paymentRouter.post("/", isAuth, async (req, res) => {
  await CreatePaymentController(req, res);
});

paymentRouter.get("/:id", isAuth, async (req, res) => {
  await getPaymentController(req, res);
});

paymentRouter.get("/", isAuth, async (req, res) => {
  await listAllPaymentController(req, res);
});

paymentRouter.put("/:id", isAuth, async (req, res) => {
  await updatePaymentController(req, res);
});

paymentRouter.delete("/:id", isAuth, async (req, res) => {
  await deletePaymentController(req, res);
});

export { paymentRouter };
