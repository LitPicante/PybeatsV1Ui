import React, { useState } from 'react';



const Productos = () => {

    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [costo, setCosto] = useState('');
    const [precioVenta, setPrecioVenta] = useState('');
    const [stock, setStock] = useState('');

    const agregarProducto = () => {
        const nuevoProducto = {
            nombre,
            descripcion,
            costo,
            precioVenta,
            stock
        };
        setProductos([...productos, nuevoProducto]);
        // Limpiar campos después de agregar
        setNombre('');
        setDescripcion('');
        setCosto('');
        setPrecioVenta('');
        setStock('');
    };

    const eliminarProducto = (index) => {
        const nuevosProductos = productos.filter((_, i) => i !== index);
        setProductos(nuevosProductos);
    };







    return (
        <div>
            <br></br>
            <br></br>
            <div className="container">

                <h1 className="text-center">Bienvenido al módulo de Productos</h1>

                <br></br>
                <br></br>

                <div className="card mx-auto" style={{ maxWidth: '600px' }}>
                    <div className="card-body">
                        <h5 className="card-title text-center">ABM de Productos</h5>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nombre"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="descripcion" className="form-label">Descripción</label>
                                <textarea
                                    className="form-control"
                                    id="descripcion"
                                    rows="3"
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="costo" className="form-label">Costo</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="costo"
                                    value={costo}
                                    onChange={(e) => setCosto(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="precioVenta" className="form-label">Precio Venta</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="precioVenta"
                                    value={precioVenta}
                                    onChange={(e) => setPrecioVenta(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="stock" className="form-label">Stock</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="stock"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </div>
                            <button
                                type="button"
                                className="btn btn-success w-100"
                                onClick={agregarProducto}>
                                Agregar
                            </button>
                        </form>
                    </div>
                </div>

                <br></br>
                <h3 className="text-center">Listado de Productos</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Costo</th>
                            <th scope="col">Precio Venta</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto, index) => (
                            <tr key={index}>
                                <td>{producto.nombre}</td>
                                <td>{producto.descripcion}</td>
                                <td>{producto.costo}</td>
                                <td>{producto.precioVenta}</td>
                                <td>{producto.stock}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => eliminarProducto(index)}>
                                        X
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br></br>
                <br></br>
                <br></br>
            </div>
        </div>
    );
};

export default Productos;