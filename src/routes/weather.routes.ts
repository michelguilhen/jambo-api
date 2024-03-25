import { Router } from "express";
import { weatherForecastController } from "../controller/weatherForecast";

const weatherRoutes = Router();

weatherRoutes.get("/weather/current", weatherForecastController.getCurrent);

weatherRoutes.get("/weather/forecast", weatherForecastController.getForecast);

export default weatherRoutes;
