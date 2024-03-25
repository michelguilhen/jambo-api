import { Router } from "express";
import { cityController } from "../controller/city.controller";

const cityRoutes = Router();

cityRoutes.get("/cities", cityController.getAll);

cityRoutes.get("/cities/:name", cityController.getByName);

export default cityRoutes;
