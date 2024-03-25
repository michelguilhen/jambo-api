import { cityService } from "../../src/services/city.service";
import { WikipediaReponse, wikipediaClient } from "../../src/clients/wikipedia";
import { cities } from "../../src/data/cities";
import City from "../../src/models/city.model";

jest.mock("../../src/clients/wikipedia");

describe("City service", () => {
  describe("getAll", () => {
    it("returns all cities", () => {
      expect(cityService.getAll()).toEqual(cities);
    });
  });

  describe("getDetailsByName", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("returns details of a city by name", async () => {
      const cityName = "Toronto";
      const mockWikipediaResponse: WikipediaReponse = {
        title: "Toronto",
        description: "Toronto's short description",
        extract: "Toronto's long description",
        extract_html: "<div>Toronto's long description in HTML</div>",
        originalimage: { width: 200, height: 150, source: "https://example.com/image.jpg" },
        pageid: 123,
        coordinates: { lat: 123, lon: 456 },
      };

      (wikipediaClient.getDetailByName as jest.Mock).mockResolvedValue(mockWikipediaResponse);

      const expectedCity: City = {
        name: mockWikipediaResponse.title,
        description: mockWikipediaResponse.extract,
        imageUrl: mockWikipediaResponse.originalimage.source,
        latitude: mockWikipediaResponse.coordinates.lat,
        longitude: mockWikipediaResponse.coordinates.lon,
      };

      const city = await cityService.getDetailsByName(cityName);

      expect(city).toEqual(expectedCity);
      expect(wikipediaClient.getDetailByName).toHaveBeenCalledWith(cityName);
    });
  });
});
