import { Router } from "express";
import { categoriesRouter } from "@/categories/infrastructure/http/routes/category.route";
import { paymentRouter } from "@/payments/infrastructure/http/routes/payment.router";
import { clientRouter } from "@/clients/infrastructure/http/routes/client.routes";
import { productRouter } from "@/products/infrastructure/http/routes/products.router";

const routes = Router();

routes.use("/category", categoriesRouter);
routes.use("/payment", paymentRouter);
routes.use("/client", clientRouter);
routes.use("/product", productRouter);

export { routes };
