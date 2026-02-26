require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./src/routes/products");
const authRoutes = require("./src/routes/auth");
const errorHandler = require("./src/middlewares/errorHandler");


const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/products", productRoutes);
app.use("/auth", authRoutes);

// Middleware de errores
app.use(errorHandler);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch(err => console.error("❌ Error al conectar a MongoDB:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));

module.exports = app; // para pruebas