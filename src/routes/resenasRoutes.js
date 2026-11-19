const express = require("express");
const controlador = require("../controllers/resenasController");

const router = express.Router();

router.get("/hoteles/:hotel_id/resenas", controlador.listarPorHotel);
router.post("/hoteles/:hotel_id/resenas", controlador.crear);
router.get("/resenas/:id", controlador.obtener);

module.exports = router;
