import axios from "axios";

interface OpenWeatherResponse {
  weather: Array<{
    main: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
  };
  dt_txt: string;
}

interface OpenWeatherForecastResponse {
  list: Array<OpenWeatherResponse>;
}

const httpClient = axios.create({
  baseURL: process.env.OPENWEATHER_API_URL,
});

const client = {
  async getCurrentWeather(latitude: number, longitude: number): Promise<OpenWeatherResponse> {
    try {
      const response = await httpClient.get<OpenWeatherResponse>("/weather", {
        params: {
          lat: latitude,
          lon: longitude,
          appid: process.env.OPENWEATHER_API_KEY,
          units: "metric",
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(
        `Error fetching current weather for latitude: ${latitude} | longitude: ${longitude}.`,
      );
    }
  },

  async getWeatherForecast(
    latitude: number,
    longitude: number,
  ): Promise<OpenWeatherForecastResponse> {
    try {
      const response = await httpClient.get<OpenWeatherForecastResponse>("/forecast", {
        params: {
          lat: latitude,
          lon: longitude,
          appid: process.env.OPENWEATHER_API_KEY,
          units: "metric",
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(
        `Error fetching current weather for latitude: ${latitude} | longitude: ${longitude}.`,
      );
    }
  },
};

export { client as openWeatherClient, OpenWeatherResponse, OpenWeatherForecastResponse };
