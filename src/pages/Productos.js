import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [costo, setCosto] = useState('');
    const [precioVenta, setPrecioVenta] = useState('');
    const [stock, setStock] = useState('');
    const [error, setError] = useState('');

    // Obtener el token del localStorage
    const token = localStorage.getItem('access_token');

    // Usar useMemo para memorizar axiosConfig y evitar recrearlo en cada render
    const axiosConfig = useMemo(() => ({
        headers: {
            Authorization: `Bearer ${token}`
        }
    }), [token]);

    // Obtener productos desde el backend
    useEffect(() => {
        axios.get('http://localhost:8000/api/productos/', axiosConfig)
            .then(response => setProductos(response.data))
            .catch(error => {
                console.error('Error fetching products:', error);
                setError('Error al obtener los productos. Verifica tu conexión o si el token es válido.');
            });
    }, [axiosConfig]);  // Usar axiosConfig como dependencia

    // Agregar nuevo producto
    const agregarProducto = () => {
        const nuevoProducto = {
            nombre,
            descripcion,
            costo: parseFloat(costo),
            precio_venta: parseFloat(precioVenta),
            stock: parseInt(stock, 10)
        };

        axios.post('http://localhost:8000/api/productos/', nuevoProducto, axiosConfig)
            .then(response => {
                setProductos([...productos, response.data]);
                setNombre('');
                setDescripcion('');
                setCosto('');
                setPrecioVenta('');
                setStock('');
            })
            .catch(error => {
                console.error('Error adding product:', error);
                setError('Error al agregar el producto.');
            });
    };

    // Eliminar producto
    const eliminarProducto = (id) => {
        axios.delete(`http://localhost:8000/api/productos/${id}/`, axiosConfig)
            .then(() => {
                setProductos(productos.filter(producto => producto.id !== id));
            })
            .catch(error => {
                console.error('Error deleting product:', error);
                setError('Error al eliminar el producto.');
            });
    };

    return (
        <div>
            <div className="container">
                <h1 className="text-center">Bienvenido al módulo de Productos</h1>

                {error && <div className="alert alert-danger text-center">{error}</div>}

                <div className="card mx-auto" style={{ maxWidth: '600px' }}>
                    <div className="card-body">
                        <h5 className="card-title text-center">ABM de Productos</h5>
                        <form>
                            <div className="form-group mb-3">
                                <label htmlFor="nombre">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nombre"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="descripcion">Descripción</label>
                                <textarea
                                    className="form-control"
                                    id="descripcion"
                                    rows="3"
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="costo">Costo</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="costo"
                                    value={costo}
                                    onChange={(e) => setCosto(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="precioVenta">Precio Venta</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="precioVenta"
                                    value={precioVenta}
                                    onChange={(e) => setPrecioVenta(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="stock">Stock</label>
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

                <h3 className="text-center mt-4">Listado de Productos</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Costo</th>
                            <th>Precio Venta</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto.id}>
                                <td>{producto.nombre}</td>
                                <td>{producto.descripcion}</td>
                                <td>{producto.costo}</td>
                                <td>{producto.precio_venta}</td>
                                <td>{producto.stock}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => eliminarProducto(producto.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Productos;
