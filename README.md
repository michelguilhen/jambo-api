# Jambo Travel Planner API

This project was built to serve as an API with cities and weather info.  
A web client was built to consume this API `jambo-web` (https://github.com/michelguilhen/jambo-web)

## Install dependencies
Run `npm install` to install project dependencies.

## Configurations

Create a `.env` file with appropriate configurations key/value. This API is using the following properties:
* WIKIPEDIA_API_URL=
* OPENWEATHER_API_URL=
* OPENWEATHER_API_KEY=

## Development

Run `npm start` to start.  API will be listening on http://localhost:3000/. If desired, change `PORT=` at `.env` file.

## Running unit tests

Run `npm run test` to execute the unit tests.

## Build

Run `tsc` to build the project. The build artifacts will be stored in the `dist/` directory.

