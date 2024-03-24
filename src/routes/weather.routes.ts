import { Request, Response, Router } from "express";
import { weatherForecastService } from "../services/weatherForecast";

const weatherRoutes = Router();

weatherRoutes.get("/weather/current", async (request: Request, response: Response) => {
  try {
    const latitude = parseFloat(request.query.latitude as string);
    const longitude = parseFloat(request.query.longitude as string);
    if (typeof latitude !== "number" || typeof longitude !== "number") {
      throw new Error();
    }
    const weather = await weatherForecastService.getCurrentWeather(latitude, longitude);
    response.send(weather);
  } catch {
    throw new Error("Invalid parameters");
  }
});

weatherRoutes.get("/weather/forecast", async (request: Request, response: Response) => {
  try {
    const latitude = parseFloat(request.query.latitude as string);
    const longitude = parseFloat(request.query.longitude as string);
    if (typeof latitude !== "number" || typeof longitude !== "number") {
      throw new Error();
    }
    const weather = await weatherForecastService.getForecast(latitude, longitude);
    response.send(weather);
  } catch {
    throw new Error("Invalid parameters");
  }
});

export default weatherRoutes;
