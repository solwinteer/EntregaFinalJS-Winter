let carritoCompras = []
const cardCompras = document.getElementsByClassName("card")[0];
const elementoMain = document.getElementsByTagName("main")[0];
let spanCarritoCompras = document.querySelector(".carrito-compras-container span");
const productosCarroCompras = document.getElementsByClassName("carro-compras-productos")[0]
const carroComprasTotal = document.getElementsByClassName("carro-compras-total")[0]
const url = new URL('productos.json', window.location.href).href;

let productos = [];
let productosFiltrados = [];

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

    updateCarrito();
    updateListaCarrito();
    guardarCarritoEnLocalStorage();

    Toastify({
        text: producto.nombre + " agregado al carrito",
        avatar: producto.urlImagen,
        duration: 3000,
        style: {
            background: "#ffcc00",
            color: "black"
        }
    }).showToast();
}

// resta un producto al carrito de compras
function restarProductoAlCarrito(producto) {
    let productoEnCarrito = carritoCompras.find(p => p.Producto.id === producto.id);
    let cantidad = productoEnCarrito.Cantidad;

    if (cantidad == 1) {
        carritoCompras = carritoCompras.filter(p => p.Producto.id != producto.id);
    }
    else {
        productoEnCarrito.Cantidad -= 1;
    }

    updateCarrito();
    updateListaCarrito();
    guardarCarritoEnLocalStorage();
}

function vaciarCarritoCompras() {
    carritoCompras = [];
    updateCarrito();
}

function updateCarrito() {
    let cantidad = 0;
    if (!carritoCompras || carritoCompras.length == 0) {
        cantidad = 0;
    }
    else {
        cantidad = carritoCompras.reduce((acumulador, producto) => {
            return acumulador + producto.Cantidad;
        }, 0);
    }

    spanCarritoCompras.innerText = cantidad;
}

// muestra/oculta el carrito de compras, actualizando el texto correspondiente
function mostrarCarritoCompras(visibilidad) {
    let divCarritoCompras = document.querySelector(".carro-compras");

    let isVisible =  visibilidad != undefined ? visibilidad : divCarritoCompras.style.visibility === 'visible';

    if (isVisible) {
        divCarritoCompras.style.visibility = "hidden";
    }
    else {
        updateListaCarrito();
        divCarritoCompras.style.visibility = "visible";
    }
}

// actualiza la lista de productos del carrito
function updateListaCarrito() {
    productosCarroCompras.innerHTML = "";
    if (!carritoCompras || carritoCompras.length == 0) {
        let span = document.createElement("span");
        span.innerText = "El carrito de compras está vacio"
        productosCarroCompras.appendChild(span);
        carroComprasTotal.innerText = "";
        document.getElementById("btnFinalizarCompra").style.display = "none";
        return;
    }
    let total = 0;
    carritoCompras.forEach(prod => {
        let div = document.createElement("div");
        let span = document.createElement("span");
        let monto = prod.Cantidad * prod.Producto.precio;
        span.innerText = `${prod.Producto.marca} - ${prod.Producto.nombre}  x ${prod.Cantidad} ($${monto})`;

        let linkAgregar = document.createElement("a");
        linkAgregar.href = "#";
        linkAgregar.onclick = function () { agregarAlCarrito(prod.Producto.id) };
        linkAgregar.innerText = " + "

        let linkRestar = document.createElement("a");
        linkRestar.href = "#";
        linkRestar.onclick = function () { restarAlCarrito(prod.Producto.id) };
        linkRestar.innerText = " - "

        div.appendChild(span);
        div.appendChild(linkAgregar);
        div.appendChild(linkRestar);
        productosCarroCompras.appendChild(div);

        document.getElementById("btnFinalizarCompra").style.display = "inline-block";
        total += monto;
    });

    carroComprasTotal.innerText = "Total: $ " + total;
}

// elimina los productos y luego los busca por el texto
function filtrarProductos() {
    let texto = document.getElementById("txtFiltro").value.toLowerCase();
    limpiarProductos();
    buscarProductos(texto);
}

// elimina todos los productos de la lista
function limpiarProductos() {
    const elementosAEliminar = document.querySelectorAll('section');
    elementosAEliminar.forEach(elemento => {
        elemento.remove();
    });
}

// filtra los productos por el texto recibido
function buscarProductos(texto) {
    productosFiltrados = productos.filter(p => p.descripcion.toLowerCase().indexOf(texto) !== -1 || p.nombre.toLowerCase().indexOf(texto) !== -1);
    crearCardsProductos();
}

// agrupo los productos por tipo y creo las card
function crearCardsProductos() {
    const productosAgrupadosPorTipo = Object.groupBy(productosFiltrados, ({ tipoProducto }) => tipoProducto);

    for (const propiedad in productosAgrupadosPorTipo) {
        const productosPorTipo = productosAgrupadosPorTipo[propiedad];

        let tituloSeccion = document.createElement("h2");
        tituloSeccion.innerText = propiedad;
        tituloSeccion.className = "titulo-categoria"
        elementoMain.appendChild(tituloSeccion);

        let elementoSection = elementoMain.appendChild(document.createElement("section"));

        productosPorTipo.forEach(producto => {
            crearNuevaCard(elementoSection, producto.nombre, producto.descripcion, producto.precio, producto.urlImagen, producto.id);
        });
    }
}

// crea una nueva card con las propiedades del producto que le paso con argumentos
function crearNuevaCard(elementoSection, nombre, descripcion, precio, imagen, id) {
    let nuevaCard = cardCompras.cloneNode(true);

    let elementoTitulo = nuevaCard.getElementsByClassName("card-title")[0];
    elementoTitulo.innerText = nombre;

    let elementoDescripcion = nuevaCard.getElementsByClassName("card-text")[0];
    elementoDescripcion.innerText = descripcion;

    let elementoPrecio = nuevaCard.getElementsByClassName("card-price")[0];
    elementoPrecio.innerText = "$ " + precio;

    let elementoBoton = nuevaCard.getElementsByClassName("btn-primary")[0];
    elementoBoton.addEventListener("click", () => {
        agregarAlCarrito(id)
    });

    let elementoImagen = nuevaCard.getElementsByClassName("card-img-top")[0];
    elementoImagen.src = imagen;

    nuevaCard.style.display = "block";
    elementoSection.appendChild(nuevaCard);
}

// agrega un producto al carrito
function agregarAlCarrito(id) {
    event.preventDefault();
    const producto = productosFiltrados.find(p => p.id === id);
    agregarProductoAlCarrito(producto);
}

// resta un producto del carrito
function restarAlCarrito(id) {
    event.preventDefault();
    const producto = productosFiltrados.find(p => p.id === id);
    restarProductoAlCarrito(producto);
}

// traer los productos desde la URL
function cargarProductos() {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener el JSON: ' + response.statusText);
            }
            return response.json();
        })
        .then(_productos => {
            productos = _productos;
            productosFiltrados = Array.from(productos);
            crearCardsProductos();
        })
        .catch(error => {
            console.error('Hubo un problema con la operación fetch:', error);
        });
}

// Función para guardar el carrito en el localStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carritoCompras', JSON.stringify(carritoCompras));
}

// Función para cargar el carrito del localStorage al cargar la página
function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carritoCompras');
    if (carritoGuardado) {
        carritoCompras = JSON.parse(carritoGuardado);
        updateCarrito();
        updateListaCarrito();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var fechaVencimientoInput = document.getElementById('fechaVencimiento');
    var inputmask = new Inputmask('99/99');
    inputmask.mask(fechaVencimientoInput);
    cargarCarritoDesdeLocalStorage();
});

document.getElementById('btnComprar').addEventListener('click', function () {
    document.getElementById("spinnerOverlay").style.display = "flex";

    setTimeout(function () {
        document.getElementById("spinnerOverlay").style.display = "none";

        var modal = document.getElementById('tarjetaModal');
        var bootstrapModal = bootstrap.Modal.getInstance(modal) || new bootstrap.Modal(modal);
        bootstrapModal.hide();

        Swal.fire({
            title: "Compra realizada con éxito!",
            width: 600,
            padding: "3em",
            color: "#716add",
            background: "#fff url(/images/trees.png)",
            backdrop: `
              rgba(0,0,123,0.4)
              url("https://sweetalert2.github.io/images/nyan-cat.gif")
              left top
              no-repeat
            `
          });

          mostrarCarritoCompras(true);
          vaciarCarritoCompras();
          localStorage.removeItem('carritoCompras');
    }, 2000);
});

cargarProductos();
