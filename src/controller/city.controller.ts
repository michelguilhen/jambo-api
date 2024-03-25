import { Request, Response } from "express";
import { cityService } from "../services/city.service";
import { handleError } from "../errors/handleError";

const controller = {
  getAll(_: Request, response: Response) {
    try {
      const cities = cityService.getAll();
      response.send(cities);
    } catch (error) {
      handleError(response, error);
    }
  },

  async getByName(request: Request, response: Response) {
    try {
      const name = request.params.name;
      const city = await cityService.getDetailsByName(name);
      response.send(city);
    } catch (error) {
      handleError(response, error);
    }
  },
};

export { controller as cityController };
