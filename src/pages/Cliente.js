import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');

  // Obtener la lista de clientes desde el backend
  useEffect(() => {
    axios.get('http://localhost:8000/clientes/')
      .then(response => setClientes(response.data))
      .catch(error => console.error('Error fetching clients:', error));
  }, []);

  // Agregar un nuevo cliente al backend
  const agregarCliente = () => {
    const nuevoCliente = { nombre, email, telefono, direccion };

    axios.post('http://localhost:8000/clientes/', nuevoCliente)
      .then(response => {
        setClientes([...clientes, response.data]);
        // Limpiar los campos del formulario después de agregar
        setNombre('');
        setEmail('');
        setTelefono('');
        setDireccion('');
      })
      .catch(error => console.error('Error adding client:', error));
  };

  // Eliminar un cliente desde el backend
  const eliminarCliente = (id) => {
    axios.delete(`http://localhost:8000/clientes/${id}/`)
      .then(() => {
        setClientes(clientes.filter(cliente => cliente.id !== id));
      })
      .catch(error => console.error('Error deleting client:', error));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center">
              <h3>ABM de Clientes</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Teléfono</label>
                  <input
                    type="text"
                    className="form-control"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Dirección</label>
                  <input
                    type="text"
                    className="form-control"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                  />
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-success mt-3"
                    onClick={agregarCliente}
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <br />

      <div className="row justify-content-center">
        <div className="col-md-6">
          <h3 className="text-center">Listado de Clientes</h3>
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.telefono}</td>
                  <td>{cliente.direccion}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => eliminarCliente(cliente.id)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Clientes;
