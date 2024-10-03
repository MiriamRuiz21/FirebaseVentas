var rutas = require("express").Router();
var { mostrarVentas, nuevaVenta, cancelarVenta, buscarPorID } = require("../bd/ventasBD");
const agregarFecha = require("../middlewares/fechaMiddleware");

rutas.get("/", async (req, res) => {
    var ventasValidas = await mostrarVentas();
    res.json(ventasValidas);
});

rutas.get("/mostrarVenta", async (req, res) => {
    var ventasValidas = await mostrarVentas();
    res.json(ventasValidas);
});

rutas.get("/buscarPorId/:id", async (req, res) => {
    var ventaValida = await buscarPorID(req.params.id);
    res.json(ventaValida);
});

rutas.put("/cancelarVenta/:id", async (req, res) => {
    var ventaActualizada = await cancelarVenta(req.params.id); 
    res.json(ventaActualizada);
});

rutas.post("/nuevaVenta", agregarFecha,async (req, res) => {
    var ventaValida = await nuevaVenta(req.body);
    res.json(ventaValida);
});

module.exports = rutas;
