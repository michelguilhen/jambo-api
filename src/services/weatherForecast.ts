import {
  OpenWeatherForecastResponse,
  OpenWeatherResponse,
  openWeatherClient,
} from "../clients/openWeather";
import Weather from "../models/weatherForecast";
import WeatherForecast from "../models/weatherForecast";

const service = {
  async getCurrentWeather(latitude: number, longitude: number): Promise<WeatherForecast> {
    const response: OpenWeatherResponse = await openWeatherClient.getCurrentWeather(
      latitude,
      longitude,
    );

    const weather: Weather = {
      condition: response.weather[0].main,
      temp: response.main.temp,
      feelsLike: response.main.temp,
      min: response.main.temp_min,
      max: response.main.temp_max,
      date: new Date(),
      icon: response.weather[0].icon,
    };

    return weather;
  },

  async getForecast(
    latitude: number,
    longitude: number,
    date?: Date,
  ): Promise<Array<WeatherForecast>> {
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
          } as WeatherForecast),
      );

    return forecasts;
  },
};

export { service as weatherForecastService };
