import { Request, Response } from "express";
import { weatherService } from "../services/weather.service";

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
    } catch {
      throw new Error("Invalid parameters");
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
    } catch {
      throw new Error("Invalid parameters");
    }
  },
};

export { controller as weatherForecastController };
