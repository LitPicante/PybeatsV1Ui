import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [error, setError] = useState('');

  // Obtener el token del localStorage
  const token = localStorage.getItem('access_token');

  // Memorizar axiosConfig para evitar recrearlo en cada render
  const axiosConfig = useMemo(() => ({
    headers: {
      Authorization: `Bearer ${token}`
    }
  }), [token]);

  // Obtener la lista de clientes desde el backend
  useEffect(() => {
    axios.get('http://localhost:8000/api/clientes/', axiosConfig)
      .then(response => setClientes(response.data))
      .catch(error => {
        console.error('Error fetching clients:', error);
        setError('Error al obtener los clientes. Verifica tu conexión o si el token es válido.');
      });
  }, [axiosConfig]);

  // Agregar un nuevo cliente al backend
  const agregarCliente = () => {
    const nuevoCliente = { nombre, email, telefono, direccion };

    axios.post('http://localhost:8000/api/clientes/', nuevoCliente, axiosConfig)
      .then(response => {
        setClientes([...clientes, response.data]);
        // Limpiar los campos del formulario después de agregar
        setNombre('');
        setEmail('');
        setTelefono('');
        setDireccion('');
      })
      .catch(error => {
        console.error('Error adding client:', error);
        setError('Error al agregar el cliente.');
      });
  };

  // Eliminar un cliente desde el backend
  const eliminarCliente = (id) => {
    axios.delete(`http://localhost:8000/api/clientes/${id}/`, axiosConfig)
      .then(() => {
        setClientes(clientes.filter(cliente => cliente.id !== id));
      })
      .catch(error => {
        console.error('Error deleting client:', error);
        setError('Error al eliminar el cliente.');
      });
  };

  return (
    <div className="container mt-5">
      {/* Mostrar el mensaje de error si ocurre */}
      {error && <div className="alert alert-danger">{error}</div>}
      
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
