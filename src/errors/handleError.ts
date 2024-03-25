import { Response } from "express";

export const handleError = (response: Response, error: any) => {
  console.error("Error:", error);
  response.status(500).json({ error: "Internal Server Error" });
};
