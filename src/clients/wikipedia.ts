import axios from "axios";

interface WikipediaReponse {
  title: string;
  pageid: number;
  originalimage: {
    source: string;
    width: number;
    height: number;
  };
  description: string;
  extract: string;
  extract_html: string;
  coordinates: {
    lat: number;
    lon: number;
  };
}

const httpClient = axios.create({
  baseURL: process.env.WIKIPEDIA_API_URL,
});

const client = {
  async getDetailByName(name: string): Promise<WikipediaReponse> {
    try {
      const response = await httpClient.get<WikipediaReponse>(`/page/summary/${name}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching summary.`);
    }
  },
};

export { client as wikipediaClient, WikipediaReponse };
