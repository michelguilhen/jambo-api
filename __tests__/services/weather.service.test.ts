import { weatherService } from "../../src/services/weather.service";
import {
  openWeatherClient,
  OpenWeatherResponse,
  OpenWeatherForecastResponse,
} from "../../src/clients/openWeather";
import Weather from "../../src/models/weather.model";

jest.mock("../../src/clients/openWeather");
jest.useFakeTimers({ now: new Date(2024, 3, 25) });

describe("Weather service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getCurrentWeather", () => {
    it("returns the current weather", async () => {
      const latitude = 22.22;
      const longitude = 33.33;
      const openWeatherResponse: OpenWeatherResponse = {
        dt_txt: "2024-03-23 21:00:00",
        main: {
          feels_like: -8.4312,
          temp: -1.124,
          temp_max: 3,
          temp_min: -7.21,
        },
        weather: [
          {
            icon: "12d",
            main: "Snow",
          },
        ],
      };

      (openWeatherClient.getCurrentWeather as jest.Mock).mockResolvedValue(openWeatherResponse);

      const expectedResult: Weather = {
        condition: "Snow",
        icon: "12d",
        date: new Date(),
        feelsLike: openWeatherResponse.main.feels_like,
        temp: openWeatherResponse.main.temp,
        max: openWeatherResponse.main.temp_max,
        min: openWeatherResponse.main.temp_min,
      };

      const result = await weatherService.getCurrentWeather(latitude, longitude);

      expect(result).toEqual(expectedResult);
    });
  });

  describe("getForecast", () => {
    it("returns the weather forecast", async () => {
      const latitude = 78.52;
      const longitude = -2.74;

      const openWeatherForecastResponse: OpenWeatherForecastResponse = {
        list: [
          {
            dt_txt: "2024-03-23 12:00:00",
            main: {
              feels_like: -8.4312,
              temp: -1.124,
              temp_max: 3,
              temp_min: -7.21,
            },
            weather: [
              {
                icon: "12d",
                main: "Snow",
              },
            ],
          },
        ],
      };

      (openWeatherClient.getWeatherForecast as jest.Mock).mockResolvedValue(
        openWeatherForecastResponse,
      );

      const expectedResult: Weather[] = [
        {
          condition: openWeatherForecastResponse.list[0].weather[0].main,
          icon: openWeatherForecastResponse.list[0].weather[0].icon,
          date: new Date(openWeatherForecastResponse.list[0].dt_txt),
          feelsLike: openWeatherForecastResponse.list[0].main.feels_like,
          temp: openWeatherForecastResponse.list[0].main.temp,
          max: openWeatherForecastResponse.list[0].main.temp_max,
          min: openWeatherForecastResponse.list[0].main.temp_min,
        },
      ];

      const result = await weatherService.getForecast(latitude, longitude);

      expect(result).toEqual(expectedResult);
    });
  });
});
