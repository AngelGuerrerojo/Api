const express = require('express');
const app = express();

const rutasUsuarios = require('./src/routes/crud');
const rutasProductos = require('./src/routes/productos');

app.use(express.json());

app.use("/api/usuarios", rutasUsuarios);
app.use("/api/productos", rutasProductos);

app.listen(3000, () => {
    console.log("listening on port 3000");
});