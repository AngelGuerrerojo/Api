const db = require("../models/connection");

async function obtener(req, res) {
    try {
        const result = await db.query("SELECT * FROM usuarios");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
}

async function saludo(req, res) {
    try {
        const { id } = req.params;
        const result = await db.query("SELECT * FROM usuarios WHERE id = $1", [id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
}

async function insertar(req, res) {
    try {
        const { usuario, password } = req.body;
        const query = "INSERT INTO usuarios (usuario, password) VALUES ($1, $2)";
        await db.query(query, [usuario, password]);
        res.send("Datos recibidos");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
}

async function actualizar(req, res) {
    try {
        const { id } = req.params;
        const { usuario, password } = req.body;
        await db.query("UPDATE usuarios SET usuario = $1, password = $2 WHERE id = $3", [usuario, password, id]);
        res.json({ mensaje: "recurso actualizado", id: id });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
}

async function actualizarcol(req, res) {
    try {
        const { id } = req.params;
        const { usuario } = req.body;
        await db.query("UPDATE usuarios SET usuario = $1 WHERE id = $2", [usuario, id]);
        res.send("Columna actualizada");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
}

async function eliminar(req, res) {
    try {
        const { id } = req.params;
        await db.query("DELETE FROM usuarios WHERE id = $1", [id]);
        res.send("Fila eliminada");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
}

module.exports = {
    obtener,
    saludo,
    insertar,
    actualizar,
    actualizarcol,
    eliminar
}