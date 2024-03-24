import { WikipediaReponse, wikipediaClient } from "../clients/wikipedia";
import City from "../models/city";
import { cities } from "../data/cities";

const service = {
  getAll(): Array<{ name: string; displayText: string }> {
    return cities;
  },

  async getDetailsByName(cityName: string): Promise<City> {
    const response: WikipediaReponse = await wikipediaClient.getDetailByName(cityName);
    const city: City = {
      name: response.title,
      description: response.description,
      imageUrl: response.originalimage.source,
      latitude: response.coordinates.lat,
      longitude: response.coordinates.lon,
    };
    return city;
  },
};

export { service as cityService };
