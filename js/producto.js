class Producto {
    constructor(id, nombre, descripcion, marca, precio, tipoProducto, urlImagen) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.marca = marca;
        this.precio = precio;
        this.tipoProducto = tipoProducto;
        this.urlImagen = urlImagen;
    }

    mostrar() {
        return this.nombre + " - " + this.descripcion + " - Marca: " + this.marca + " - Precio: $" + this.precio;
    }
}