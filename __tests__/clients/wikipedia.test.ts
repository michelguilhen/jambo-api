import axios from "axios";
import { WikipediaReponse, wikipediaClient } from "../../src/clients/wikipedia";

jest.mock("axios", () => ({
  create: jest.fn(() => axios),
}));

describe("Wikipedia client", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getDetailByName", () => {
    it("fetches summary by name", async () => {
      const testName = "Calgary";
      const mockResponse: WikipediaReponse = {
        coordinates: {
          lat: 1,
          lon: -1,
        },
        description: "A nice city",
        extract: "A longer description that says it's a nice city",
        extract_html: "<div>A longer description that says it's a nice city wrapped in HTML</div>",
        originalimage: {
          height: 100,
          width: 150,
          source: "https://city-images.com/calgary_city.png",
        },
        pageid: 123,
        title: testName,
      };
      axios.get = jest.fn().mockResolvedValue({ data: mockResponse });

      const result = await wikipediaClient.getDetailByName(testName);

      expect(result).toEqual(mockResponse);
      expect(axios.get).toHaveBeenCalledWith(`/page/summary/${testName}`);
    });

    it("fetches summary by name & check details", async () => {
      const testName = "Toronto";
      const mockResponse: WikipediaReponse = {
        coordinates: {
          lat: 1,
          lon: -1,
        },
        description: "A crowded city",
        extract: "Lots of traffic and expensive rent",
        extract_html: "<div>Lots of traffic and expensive rent wrapped in HTML</div>",
        originalimage: {
          height: 125,
          width: 176,
          source: "https://city-images.com/toronto_city.png",
        },
        pageid: 1425,
        title: testName,
      };
      axios.get = jest.fn().mockResolvedValue({ data: mockResponse });

      const result = await wikipediaClient.getDetailByName(testName);

      expect(result).toEqual(mockResponse);
      expect(result.title).toEqual(mockResponse.title);
      expect(result.description).toEqual(mockResponse.description);
      expect(result.extract_html).toContain("<div>");
      expect(result.originalimage).toHaveProperty("width");
      expect(result.originalimage).toHaveProperty("height");
      expect(result.originalimage).toHaveProperty("source");
      expect(axios.get).toHaveBeenCalledWith(`/page/summary/${testName}`);
    });

    it("throws error when fetch fails", async () => {
      const testName = "Vancouver";
      const errorMessage = "Error fetching summary";

      axios.get = jest.fn().mockRejectedValue(new Error(errorMessage));

      await expect(wikipediaClient.getDetailByName(testName)).rejects.toThrow(errorMessage);
      expect(axios.get).toHaveBeenCalledWith(`/page/summary/${testName}`);
    });
  });
});
