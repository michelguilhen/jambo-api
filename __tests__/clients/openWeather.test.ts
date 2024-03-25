import axios from "axios";
import {
  openWeatherClient,
  OpenWeatherResponse,
  OpenWeatherForecastResponse,
} from "../../src/clients/openWeather";
// axios instance mock
jest.mock("axios", () => ({
  create: jest.fn(() => axios),
}));

describe("OpenWeather client", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("getCurrentWeather", () => {
    it("fetches current weather", async () => {
      const latitude = 51.51;
      const longitude = -0.13;
      const mockResponse: OpenWeatherResponse = {
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
      axios.get = jest.fn().mockResolvedValue({ data: mockResponse });
      const weather = await openWeatherClient.getCurrentWeather(latitude, longitude);
      expect(weather).toEqual(mockResponse);
      expect(axios.get).toHaveBeenCalledWith(`/weather`, {
        params: {
          lat: latitude,
          lon: longitude,
          appid: undefined,
          units: "metric",
        },
      });
    });

    it("fetches current weather", async () => {
      const latitude = 25.89;
      const longitude = 24.43;
      const mockResponse: OpenWeatherResponse = {
        dt_txt: "2024-03-26 21:00:00",
        main: {
          feels_like: 34.543333,
          temp: 36.01231,
          temp_max: 37.9812,
          temp_min: 26.8733,
        },
        weather: [
          {
            icon: "8d",
            main: "Clear",
          },
        ],
      };
      axios.get = jest.fn().mockResolvedValue({ data: mockResponse });
      const result = await openWeatherClient.getCurrentWeather(latitude, longitude);
      expect(result).toEqual(mockResponse);
      expect(result.dt_txt).toEqual(mockResponse.dt_txt);
      expect(result.main).toEqual(mockResponse.main);
      expect(result.weather).toEqual(mockResponse.weather);
      expect(result.weather.length).toBe(1);
      expect(axios.get).toHaveBeenCalledWith(`/weather`, {
        params: {
          lat: latitude,
          lon: longitude,
          appid: undefined,
          units: "metric",
        },
      });
    });

    it("throws error when fetch fails", async () => {
      const latitude = 25.89;
      const longitude = 24.43;
      const errorMessage = `Error fetching current weather for latitude: ${latitude} | longitude: ${longitude}.`;

      axios.get = jest.fn().mockRejectedValue(new Error(errorMessage));

      await expect(openWeatherClient.getCurrentWeather(latitude, longitude)).rejects.toThrow(
        errorMessage,
      );
      expect(axios.get).toHaveBeenCalledWith(`/weather`, {
        params: {
          lat: latitude,
          lon: longitude,
          appid: undefined,
          units: "metric",
        },
      });
    });
  });

  describe("getWeatherForecast", () => {
    it("fetches weather forecast", async () => {
      const latitude = 11.19;
      const longitude = 21.23;
      const mockResponse: OpenWeatherForecastResponse = {
        list: [
          {
            dt_txt: "2024-03-26 21:00:00",
            main: {
              feels_like: 34.543333,
              temp: 36.01231,
              temp_max: 37.9812,
              temp_min: 26.8733,
            },
            weather: [
              {
                icon: "8d",
                main: "Clear",
              },
            ],
          },
          {
            dt_txt: "2024-03-26 21:00:00",
            main: {
              feels_like: 34.543333,
              temp: 36.01231,
              temp_max: 37.9812,
              temp_min: 26.8733,
            },
            weather: [
              {
                icon: "8d",
                main: "Clear",
              },
            ],
          },
          {
            dt_txt: "2024-03-26 21:00:00",
            main: {
              feels_like: 34.543333,
              temp: 36.01231,
              temp_max: 37.9812,
              temp_min: 26.8733,
            },
            weather: [
              {
                icon: "8d",
                main: "Clear",
              },
            ],
          },
        ],
      };
      axios.get = jest.fn().mockResolvedValue({ data: mockResponse });
      const result = await openWeatherClient.getWeatherForecast(latitude, longitude);
      expect(result).toEqual(mockResponse);
      expect(result.list.length > 0).toBeTruthy();
      expect(axios.get).toHaveBeenCalledWith(`/forecast`, {
        params: {
          lat: latitude,
          lon: longitude,
          appid: undefined,
          units: "metric",
        },
      });
    });

    it("throws error when fetch fails", async () => {
      const latitude = 50.29;
      const longitude = 12.43;
      const errorMessage = `Error fetching current weather for latitude: ${latitude} | longitude: ${longitude}.`;

      axios.get = jest.fn().mockRejectedValue(new Error(errorMessage));

      await expect(openWeatherClient.getWeatherForecast(latitude, longitude)).rejects.toThrow(
        errorMessage,
      );
      expect(axios.get).toHaveBeenCalledWith(`/forecast`, {
        params: {
          lat: latitude,
          lon: longitude,
          appid: undefined,
          units: "metric",
        },
      });
    });
  });
});
