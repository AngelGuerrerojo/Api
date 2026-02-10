const db = require("../models/connection");

async function obtener(req, res) {
    try {
        const result = await db.query("SELECT * FROM productos");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
}

async function obtenerPorId(req, res) {
    try {
        const { id } = req.params;
        const result = await db.query("SELECT * FROM productos WHERE id = $1", [id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
}

async function insertar(req, res) {
    try {
        const { nombre, precio } = req.body;
        const query = "INSERT INTO productos (nombre, precio) VALUES ($1, $2)";
        await db.query(query, [nombre, precio]);
        res.send("Datos recibidos");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
}

async function actualizar(req, res) {
    try {
        const { id } = req.params;
        const { nombre, precio } = req.body;
        await db.query("UPDATE productos SET nombre = $1, precio = $2 WHERE id = $3", [nombre, precio, id]);
        res.json({ mensaje: "recurso actualizado", id: id });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
}

async function actualizarPrecio(req, res) {
    try {
        const { id } = req.params;
        const { precio } = req.body;
        await db.query("UPDATE productos SET precio = $1 WHERE id = $2", [precio, id]);
        res.send("Columna actualizada");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
}

async function eliminar(req, res) {
    try {
        const { id } = req.params;
        await db.query("DELETE FROM productos WHERE id = $1", [id]);
        res.send("Fila eliminada");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
}

module.exports = {
    obtener,
    obtenerPorId,
    insertar,
    actualizar,
    actualizarPrecio,
    eliminar
}