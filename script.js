// constantes
const TIPO_PRODUCTO = {
    Comida: "COMIDA",
    Juguete: "JUGETE",
    Higiene: "HIGIENE"
}
const NO_APLICA = "N/A"

// clase Producto
class Producto {
    constructor(id, nombre, descripcion, marca, precio, tipoProducto) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.marca = marca;
        this.precio = precio;
        this.tipoProducto = tipoProducto;
    }

    mostrar() {
        return this.nombre + " - " + this.descripcion + " - Marca: " + this.marca + " - Precio: $" + this.precio;
    }
}

let carritoCompras = []

// declaro el array de productos
const productos = [
    new Producto(1, 'Satiety', 'Alimento balanceado para gato regulador de peso.', 'Royal Cannin', 30, TIPO_PRODUCTO.Comida),
    new Producto(2, 'Light', 'Alimento balanceado para gato regulador de peso.', 'Royal Cannin', 25, TIPO_PRODUCTO.Comida),
    new Producto(3, 'Indoor', 'Alimento balanceado para gato de interior.', 'Royal Cannin', 20, TIPO_PRODUCTO.Comida),
    new Producto(4, 'Mini Adulto', 'Alimento balanceado para perro de tamaño chico.', 'Royal Cannin', 22, TIPO_PRODUCTO.Comida),
    new Producto(5, 'Digestive', 'Alimento balanceado de facil digestión para perro de tamaño mediano.', 'Royal Cannin', 28, TIPO_PRODUCTO.Comida),

    new Producto(6, 'Hueso', 'Hueso de cuero de vaca comestible.', NO_APLICA, 5, TIPO_PRODUCTO.Juguete),
    new Producto(7, 'Caña', 'Caña de juguete con forma de rata para gato.', NO_APLICA, 3, TIPO_PRODUCTO.Juguete),
    new Producto(8, 'Pelota', 'Pelota de tenis.', NO_APLICA, 4, TIPO_PRODUCTO.Juguete),

    new Producto(9, 'Piedritas sanitarias', 'Piedras sanitarias para gato de 1.5kg', 'Pichichos', 3.5, TIPO_PRODUCTO.Higiene),
    new Producto(10, 'Piedritas sanitarias', 'Piedras aglomerantes sanitarias para gato de 4kg', 'Michis', 7, TIPO_PRODUCTO.Higiene),
    new Producto(11, 'Shampoo para perro', 'Shampoo para perro de 200ml hipoalergénico', 'Mis perritos', 6, TIPO_PRODUCTO.Higiene),
]

// muestra el carrito de compras
function mostrarCarritoCompras() {
    let total = 0;
    let textoCarrito = 'Carrito de compras: \n\n';
    for (let i = 0; i < carritoCompras.length; i++) {
        textoCarrito += `${i + 1}) ${carritoCompras[i].Producto.mostrar()} - Cantidad: ${carritoCompras[i].Cantidad}\n`;
        total += carritoCompras[i].Producto.precio * carritoCompras[i].Cantidad;
    }
    textoCarrito += '\n----------------------------\nTOTAL: $' + total;
    alert(textoCarrito);
}

// muestra el menu segun el menu principal
function mostrarMenu() {
    let opcion;
    do {
        opcion = prompt(`Elija una categoría de producto: \n\n0) FINALIZAR\n1) ${TIPO_PRODUCTO.Comida}\n2) ${TIPO_PRODUCTO.Juguete}\n3) ${TIPO_PRODUCTO.Higiene}`)

        if (opcion === '1') {
            mostrarMenuProducto(TIPO_PRODUCTO.Comida);
        }
        else if (opcion === '2') {
            mostrarMenuProducto(TIPO_PRODUCTO.Juguete);
        }
        else if (opcion === '3') {
            mostrarMenuProducto(TIPO_PRODUCTO.Higiene);
        }
    } while (opcion != "0");

    mostrarCarritoCompras();
}

// agrega un producto al carrito de compras. si existe le sube la cantidad, si no lo agrega con cantidad 1 
function agregarProductoAlCarrito(producto) {
    let productoEnCarrito = carritoCompras.find(p => p.Producto.id === producto.id);

    if (productoEnCarrito == null) {
        carritoCompras.push({
            Producto: producto,
            Cantidad: 1,
        });
    }
    else {
        productoEnCarrito.Cantidad += 1;
    }

    alert("Producto agregado al carrito.")
}

// muestra el menu dependiendo del tipo de producto que reciba por parametro
function mostrarMenuProducto(tipoProducto) {
    let opcion;
    const productosPorTipo = productos.filter(p => p.tipoProducto === tipoProducto);
    let opciones = 'Elija un producto: \n\n0) VOLVER\n';
    for (let i = 0; i < productosPorTipo.length; i++) {
        opciones += `${i + 1}) ` + productosPorTipo[i].mostrar() + '\n';
    }
    do {
        opcion = parseInt(prompt(opciones));

        if (opcion > productosPorTipo.length || opcion < 0) {
            alert('Opción incorrecta.');
        }
        else if (opcion != 0) {
            agregarProductoAlCarrito(productosPorTipo[opcion - 1]);
        }
    } while (opcion != "0")
}

mostrarMenu();
