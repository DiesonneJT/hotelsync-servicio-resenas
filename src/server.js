require("dotenv").config();
const express = require("express");
const cors = require("cors");

const resenasRoutes = require("./routes/resenasRoutes");

const { metricsMiddleware, client } = require("./metrics");
const app = express();
app.use(cors());
app.use(express.json());
app.use(metricsMiddleware);

app.get("/health", (req, res) => res.json({ estado: "ok", servicio: "resenas" }));
app.use("/api", resenasRoutes);

const PUERTO = process.env.PORT || 3013;

app.listen(PUERTO, () => {
  console.log(`[resenas] Escuchando en http://localhost:${PUERTO}`);
});
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

module.exports = app;
