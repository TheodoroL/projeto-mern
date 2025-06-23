import { Router } from "express";
import { serve, setup } from "swagger-ui-express";
import swaggerDocs from "../../swagger.json";
export const swaggerRouter: Router = Router();
swaggerRouter.use("/", serve, setup(swaggerDocs));
