var rutas = require("express").Router();
var { mostrarProductos, nuevoProducto, borrarProducto, buscarPorID } = require("../bd/ProductosBD");

rutas.get("/", async (req, res) => {
    var productosValidos = await mostrarProductos();
    res.json(productosValidos);
});

rutas.get("/mostrarProducto", async (req, res) => {
    var productosValidos = await mostrarProductos();
    res.json(productosValidos);
});

rutas.get("/buscarPorId/:id", async (req, res) => {
    var productoValido = await buscarPorID(req.params.id);
    res.json(productoValido);
});

rutas.delete("/borrarProducto/:id", async (req, res) => {
    var productoBorrado = await borrarProducto(req.params.id);
    res.json(productoBorrado);
});

rutas.post("/nuevoProducto", async (req, res) => {
    var productoValido = await nuevoProducto(req.body);
    res.json(productoValido);
});

module.exports = rutas;
