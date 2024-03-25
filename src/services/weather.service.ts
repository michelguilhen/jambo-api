import {
  OpenWeatherForecastResponse,
  OpenWeatherResponse,
  openWeatherClient,
} from "../clients/openWeather";
import Weather from "../models/weather.model";

const service = {
  async getCurrentWeather(latitude: number, longitude: number): Promise<Weather> {
    const response: OpenWeatherResponse = await openWeatherClient.getCurrentWeather(
      latitude,
      longitude,
    );

    const weather: Weather = {
      condition: response.weather[0].main,
      temp: response.main.temp,
      feelsLike: response.main.feels_like,
      min: response.main.temp_min,
      max: response.main.temp_max,
      date: new Date(),
      icon: response.weather[0].icon,
    };

    return weather;
  },

  async getForecast(latitude: number, longitude: number, date?: Date): Promise<Array<Weather>> {
    const response: OpenWeatherForecastResponse = await openWeatherClient.getWeatherForecast(
      latitude,
      longitude,
    );

    const forecasts = response.list
      .filter((forecast) => forecast.dt_txt.includes("12:00:00"))
      .map(
        (forecast) =>
          ({
            condition: forecast.weather[0].main,
            temp: forecast.main.temp,
            feelsLike: forecast.main.temp,
            min: forecast.main.temp_min,
            max: forecast.main.temp_max,
            date: new Date(forecast.dt_txt),
            icon: forecast.weather[0].icon,
          } as Weather),
      );

    return forecasts;
  },
};

export { service as weatherService };
