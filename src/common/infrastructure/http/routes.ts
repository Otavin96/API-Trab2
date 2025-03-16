import { categoryRouter } from "@/categories/infrastructure/http/routes/category.route";
import { Router } from "express";

const routes = Router();

routes.get("/", (req, res) => {
  res.status(200).json({ message: "Ola Dev!" });
});

routes.use("/category", categoryRouter);
// routes.use('/suppliers', supplierRouter)
// routes.use('/users', usersRouter)
// routes.use('/stockMovement', stockMovementRouter)
// routes.use('/password', userTokenRouter)

export { routes };
