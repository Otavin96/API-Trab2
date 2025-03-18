import { Router } from "express";
import { categoriesRouter } from "@/categories/infrastructure/http/routes/category.route";
import { paymentRouter } from "@/payments/infrastructure/http/routes/payment.router";


const routes = Router();

routes.use("/category", categoriesRouter);
routes.use("/payment", paymentRouter);


export { routes };
