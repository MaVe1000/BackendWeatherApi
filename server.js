const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors"); // Asegúrate de instalar cors y node-fetch en la terminal de bash en la carpeta del proyecto
// Puedes instalarlo con: npm install cors node-fetch. Es para permitir solicitudes cruzadas desde el frontend a tu API.

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.get("/api/clima", async (req, res) => {
  const ciudad = req.query.ciudad;
  const apiKey = process.env.OPENWEATHER_API_KEY; // Tu clave guardada como variable de entorno

  if (!ciudad) return res.status(400).json({ error: "Falta ciudad" });

  try {
    const respuesta = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&APPID=${apiKey}`
    );
    const datos = await respuesta.json();
    res.json(datos);
  } catch (err) {
    res.status(500).json({ error: "Error consultando OpenWeatherMap" });
  }
});

app.listen(PORT, () => console.log(`API corriendo en puerto ${PORT}`));
