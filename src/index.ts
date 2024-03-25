import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import cityRoutes from "./routes/city.routes";
import weatherRoutes from "./routes/weather.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", cityRoutes);
app.use("/api", weatherRoutes);

app.listen(process.env.PORT, () => {
  console.log("Application listing on port", process.env.PORT);
  console.log("Environment:", process.env.NODE_ENV);
});
