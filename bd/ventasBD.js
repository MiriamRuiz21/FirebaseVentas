
const ventasBD = require("./conexion").ventas;
const Venta = require("../modelos/VentaModelo");

function validarDatos(venta) {
    return venta.idProducto != undefined && venta.idUsuario != undefined && venta.fechaYHora != undefined && venta.status != undefined;
}

async function mostrarVentas() {
    const ventas = await ventasBD.get();
    const ventasValidas = [];
    ventas.forEach(venta => {
        const venta1 = new Venta({ id: venta.id, ...venta.data() });

        if (validarDatos(venta1.getVenta)) {
            ventasValidas.push(venta1.getVenta);
        }
    });
    return ventasValidas;
}

async function buscarPorID(id) {
    const venta = await ventasBD.doc(id).get();
    const venta1 = new Venta({ id: venta.id, ...venta.data() });
    let ventaValida;
    if (validarDatos(venta1.getVenta)) {
        ventaValida = venta1.getVenta;
    }
    return ventaValida;
}

async function nuevaVenta(data) {
    const venta1 = new Venta(data);
    let ventaValida = false;
    if (validarDatos(venta1.getVenta)) {
        await ventasBD.doc().set(venta1.getVenta);
        ventaValida = true;
    }
    return ventaValida;
}

async function cancelarVenta(id) {
    // Obtener la venta por ID
    const venta = await ventasBD.doc(id).get();
    let ventaCancelada = false;

    if (venta.exists) {
        const ventaData = venta.data();
        console.log("Estado actual de la venta:", ventaData.status); 
        if (ventaData.status === "vendido") {
            await ventasBD.doc(id).update({
                status: "cancelado"
            });
            ventaCancelada = true;
        }
    }

    return ventaCancelada;
}




module.exports = {
    mostrarVentas,
    nuevaVenta,
    cancelarVenta,
    buscarPorID
};

