
const impuestoIVA = 0.21;
let precioProducto;
do {
    precioProducto = prompt("Ingrese el precio del producto:")
    if (isNaN(precioProducto)) {
        alert("Por favor ingrese un precio numerico!")
    }
} while (isNaN(precioProducto))

let descuento = calcularDescuento(precioProducto);

calcularPrecioFinal(precioProducto, descuento, impuestoIVA)

function calcularPrecioFinal(precioProducto, descuento, impuesto) {
    let montoDescuento = precioProducto * descuento;
    let precioImpuesto = precioProducto * impuesto;
    let precioFinal = (precioProducto - montoDescuento) + precioImpuesto;
    
    alert("El precio final del producto es: " + precioFinal + "\n\n\nPrecio inicial: " + precioProducto + "\nMonto descuento: " + montoDescuento + " (" + descuento * 100 + "%)\nMonto impuesto: " + precioImpuesto + " (" + impuestoIVA * 100 + "%)")
}

function calcularDescuento(precioProducto) {
    let descuento = 0;
    if (precioProducto < 5000) { 
        descuento = 0.05; // 5%
    }
    else if (precioProducto >= 25000) {
        descuento = 0.2; // 20%
    }
    else if (precioProducto >= 15000) {
        descuento = 0.15; // 15%
    }
    else if (precioProducto >= 5000) {
        descuento = 0.1; // 10%
    }
    return descuento;
}