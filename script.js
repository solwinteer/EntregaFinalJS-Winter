let carritoCompras = []
const cardCompras = document.getElementsByClassName("card")[0];
const elementoMain = document.getElementsByTagName("main")[0];
let spanCarritoCompras = document.querySelector(".carrito-compras-container span");
const productosCarroCompras = document.getElementsByClassName("carro-compras-productos")[0]
const carroComprasTotal = document.getElementsByClassName("carro-compras-total")[0]
// declaro el array de productos
const productos = [
    new Producto(1, 'Satiety', 'Alimento balanceado para gato regulador de peso.', 'Royal Cannin', 30, TIPO_PRODUCTO.Comida, 'https://cdn.royalcanin-weshare-online.io/Ij93eoYBRYZmsWpcS_N5/v9/ar-l-satiety-feline-seco-vhn-01'),
    new Producto(2, 'Light', 'Alimento balanceado para gato regulador de peso.', 'Royal Cannin', 25, TIPO_PRODUCTO.Comida, 'https://traviesospetshop.com.ar/wp-content/uploads/2023/01/light-gato-para-pagi-web.png'),
    new Producto(3, 'Indoor', 'Alimento balanceado para gato de interior.', 'Royal Cannin', 20, TIPO_PRODUCTO.Comida, 'https://cdn.royalcanin-weshare-online.io/8j-CLIYBRYZmsWpcGfF-/v13/ar-l-indoor-seco-fhn-01'),
    new Producto(4, 'Mini Adulto', 'Alimento balanceado para perro de tamaño chico.', 'Royal Cannin', 22, TIPO_PRODUCTO.Comida, 'https://catycanar.vtexassets.com/arquivos/ids/155397/47.jpg?v=637637870051770000'),
    new Producto(5, 'Digestive', 'Alimento balanceado de facil digestión para perro de tamaño mediano.', 'Royal Cannin', 28, TIPO_PRODUCTO.Comida, 'https://faunatown.com.ar/wp-content/uploads/2021/07/FT-E-commerce.png'),

    new Producto(6, 'Hueso', 'Hueso de cuero de vaca comestible.', NO_APLICA, 5, TIPO_PRODUCTO.Juguete, 'https://www.mivetshop.com.ar/media/catalog/product/cache/f45fac214c5ee5bb0b2a50e4e7188992/6/5/654561_mesa_de_trabajo_1_3.jpg'),
    new Producto(7, 'Caña', 'Caña de juguete con forma de rata para gato.', NO_APLICA, 3, TIPO_PRODUCTO.Juguete, 'https://http2.mlstatic.com/D_NQ_NP_718219-MLU70707492873_072023-O.webp'),
    new Producto(8, 'Pelota', 'Pelota de tenis.', NO_APLICA, 4, TIPO_PRODUCTO.Juguete, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYWSNj9Oi3SKc1XnyaTckTOjdc3ZowU5me4njH-JgnSg&s'),

    new Producto(9, 'Piedritas sanitarias', 'Piedras sanitarias para gato de 1.5kg', 'Pichichos', 3.5, TIPO_PRODUCTO.Higiene, 'https://faunatown.com.ar/wp-content/uploads/2022/11/Productos-Web.png'),
    new Producto(10, 'Piedritas sanitarias', 'Piedras aglomerantes sanitarias para gato de 4kg', 'Michis', 7, TIPO_PRODUCTO.Higiene, 'https://herspet.com/wp-content/uploads/2020/10/piedras-sanitarias-michi-feliz-10bolsas-de-18-kg-D_NQ_NP_764948-MLA41577055605_042020-F.jpg'),
    new Producto(11, 'Shampoo para perro', 'Shampoo para perro de 200ml hipoalergénico', 'Mis perritos', 6, TIPO_PRODUCTO.Higiene, 'https://acdn.mitiendanube.com/stores/001/151/906/products/osspretpgp1-196570682675c509c716690723431774-640-0.jpeg'),
]

let productosFiltrados = Array.from(productos);

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
    actualizarStorage();
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
    actualizarStorage();
}

function actualizarStorage() {
    if (!carritoCompras || carritoCompras.length == 0) {
        localStorage.setItem(CARRITO_COMPRAS_KEY, null);
    }
    else {
        localStorage.setItem(CARRITO_COMPRAS_KEY, JSON.stringify(carritoCompras));
    }
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
function mostrarCarritoCompras() {
    let divCarritoCompras = document.querySelector(".carro-compras");
    let isVisible = divCarritoCompras.style.visibility === 'visible';

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
        linkAgregar.onclick = function() { agregarAlCarrito(prod.Producto.id) };
        linkAgregar.innerText = " + "

        let linkRestar = document.createElement("a");
        linkRestar.href = "#";
        linkRestar.onclick = function() { restarAlCarrito(prod.Producto.id) };
        linkRestar.innerText = " - "
        
        div.appendChild(span);
        div.appendChild(linkAgregar);
        div.appendChild(linkRestar);
        productosCarroCompras.appendChild(div);
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

// carga el carrito de compras del storage y lo actualiza
function cargarCarritoCompras() {
    var carritoStorage = localStorage.getItem(CARRITO_COMPRAS_KEY);
    if (carritoStorage || carritoStorage?.length > 0) {
        carritoCompras = JSON.parse(carritoStorage);
        updateCarrito();
    }
}

crearCardsProductos();
cargarCarritoCompras();
