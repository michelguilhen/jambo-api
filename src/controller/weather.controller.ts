import { Request, Response } from "express";
import { weatherService } from "../services/weather.service";
import { handleError } from "../errors/handleError";

const controller = {
  async getCurrent(request: Request, response: Response) {
    try {
      const latitude = parseFloat(request.query.latitude as string);
      const longitude = parseFloat(request.query.longitude as string);
      if (typeof latitude !== "number" || typeof longitude !== "number") {
        throw new Error();
      }
      const weather = await weatherService.getCurrentWeather(latitude, longitude);
      response.send(weather);
    } catch (error) {
      handleError(response, error);
    }
  },

  async getForecast(request: Request, response: Response) {
    try {
      const latitude = parseFloat(request.query.latitude as string);
      const longitude = parseFloat(request.query.longitude as string);
      if (typeof latitude !== "number" || typeof longitude !== "number") {
        throw new Error();
      }
      const weather = await weatherService.getForecast(latitude, longitude);
      response.send(weather);
    } catch (error) {
      handleError(response, error);
    }
  },
};

export { controller as weatherForecastController };
