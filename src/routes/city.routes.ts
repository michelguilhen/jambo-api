import { Request, Response, Router } from "express";
import { cityService } from "../services/city";

const cityRoutes = Router();

cityRoutes.get("/cities", (_, response: Response) => {
  const cities = cityService.getAll();
  response.send(cities);
});

cityRoutes.get("/cities/:name", async (request: Request, response: Response) => {
  const name = request.params.name;
  const city = await cityService.getDetailsByName(name);
  response.send(city);
});

export default cityRoutes;
