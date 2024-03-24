import * as dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";

import cityRoutes from "./routes/city.routes";
import weatherRoutes from "./routes/weather.routes";

const app = express();

app.use(express.json());

app.use("/api", cityRoutes);
app.use("/api", weatherRoutes);

app.listen(3000, () => {
  console.log("Application started and available on port 3000");
  console.log("ENV: ", process.env.NODE_ENV);
});
