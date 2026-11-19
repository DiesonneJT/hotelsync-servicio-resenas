const pool = require("../config/baseDeDatos");

async function listarPorHotel(req, res) {
  const { hotel_id } = req.params;
  try {
    const { rows } = await pool.query(
      "SELECT * FROM resenas WHERE hotel_id = $1 ORDER BY creado_en DESC",
      [hotel_id]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al listar resenas", detalle: error.message });
  }
}

async function crear(req, res) {
  const { hotel_id } = req.params;
  const { usuario_id, nombre_usuario, calificacion, comentario } = req.body;
  if (!calificacion || calificacion < 1 || calificacion > 5) {
    return res.status(400).json({ error: "La calificacion debe estar entre 1 y 5" });
  }
  try {
    const { rows } = await pool.query(
      "INSERT INTO resenas (hotel_id, usuario_id, nombre_usuario, calificacion, comentario) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [hotel_id, usuario_id || null, nombre_usuario || "Anonimo", calificacion, comentario || ""]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al crear resena", detalle: error.message });
  }
}

async function obtener(req, res) {
  try {
    const { rows } = await pool.query("SELECT * FROM resenas WHERE id = $1", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Resena no encontrada" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener resena", detalle: error.message });
  }
}

module.exports = { listarPorHotel, crear, obtener };
