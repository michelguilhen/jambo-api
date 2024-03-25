import { Request, Response } from "express";
import { cityService } from "../services/city.service";

const controller = {
  getAll(_: Request, response: Response) {
    const cities = cityService.getAll();
    response.send(cities);
  },

  async getByName(request: Request, response: Response) {
    const name = request.params.name;
    const city = await cityService.getDetailsByName(name);
    response.send(city);
  },
};

export { controller as cityController };
