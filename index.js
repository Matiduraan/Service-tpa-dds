import express from "express";
import { getUserConfidence } from "./controllers/confidenceController.js";
const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Origin"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/user_confidence", (req, res) => {
  try {
    // console.log(req.body);
    const { id_usuario, incidentes, grado_confianza } = req.body;
    const newConfidenceLevel = getUserConfidence(
      grado_confianza,
      incidentes,
      id_usuario
    );
    console.log(newConfidenceLevel);
    res.status(200).send({ newConfidenceLevel });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
