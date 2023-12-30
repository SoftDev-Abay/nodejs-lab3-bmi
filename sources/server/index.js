import express from "express";
import fs from "fs";
import {
  getBMIIndex,
  getBMIPrime,
  getBMIClassification,
  healthyBMIRange,
  convertBMItoWeight,
} from "./bmi.js";

const { urlencoded } = express;

// Express server initialization
const server = express();

const port = 3000;

const host = "0.0.0.0";

server.use(urlencoded({ extended: true }));

server.use(express.static("sources/client"));

server.post("/bmi", express.json(), (req, res) => {
  try {
    console.log(req.body);

    let { age, gender, weight, height } = req.body;

    age = parseInt(age);
    weight = parseInt(weight);
    height = parseInt(height) / 100;

    console.log(age, gender, weight, height);

    if (height < 0 || weight < 0 || age < 0) {
      throw new Error("Invalid input");
    }

    const bmi = getBMIIndex(age, weight, height, gender).toFixed(2);
    const classification = getBMIClassification(bmi);
    const bmiPrime = getBMIPrime(bmi).toFixed(2);
    const healthyWeightRange = [
      convertBMItoWeight(healthyBMIRange[0], height).toFixed(2),
      convertBMItoWeight(healthyBMIRange[1], height).toFixed(2),
    ];

    const data = {
      bmi,
      classification,
      bmiPrime,
      healthyWeightRange,
    };

    console.log(data);

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(404).end();
  }
});

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
