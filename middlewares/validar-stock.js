const { request, response } = require('express');
const Producto = require('../models/producto');

const validarStock = async (req = request, res = response, next) => {
    const { productos, cantidadProductos } = req.body;
  
    for (let i = 0; i < productos.length; i++) {
      const cantidadProducto = cantidadProductos[i];
      const producto = productos[i];
  
      const buscarProductoDB = await Producto.findById(producto);
      if (buscarProductoDB) {
        if (buscarProductoDB.disponible === false) {
          return res.status(400).json({
            msg: "Este producto no esta disponible",
          });
        }
  
        if (cantidadProducto > buscarProductoDB.cantidad) {
          return res.status(405).json({
            msg: `No hay tantas existencias del producto`,
          });
        }
      }
    }
  
    next();
};

module.exports = {
    validarStock,
}