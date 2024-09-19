import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Mascotas = () => {
  const [mascotas, setMascotas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [raza, setRaza] = useState('');
  const [edad, setEdad] = useState('');
  const [dueño, setDueño] = useState('');

  // Obtener la lista de mascotas desde el backend
  useEffect(() => {
    axios.get('http://localhost:8000/mascotas/')
      .then(response => setMascotas(response.data))
      .catch(error => console.error('Error fetching pets:', error));
  }, []);

  // Agregar una nueva mascota al backend
  const agregarMascota = () => {
    const nuevaMascota = { nombre, raza, edad: parseInt(edad), dueño };

    axios.post('http://localhost:8000/mascotas/', nuevaMascota)
      .then(response => {
        setMascotas([...mascotas, response.data]);
        // Limpiar los campos del formulario después de agregar
        setNombre('');
        setRaza('');
        setEdad('');
        setDueño('');
      })
      .catch(error => console.error('Error adding pet:', error));
  };

  // Eliminar una mascota desde el backend
  const eliminarMascota = (id) => {
    axios.delete(`http://localhost:8000/mascotas/${id}/`)
      .then(() => {
        setMascotas(mascotas.filter(mascota => mascota.id !== id));
      })
      .catch(error => console.error('Error deleting pet:', error));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center">
              <h3>ABM de Mascotas</h3>
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
                  <label>Raza</label>
                  <input
                    type="text"
                    className="form-control"
                    value={raza}
                    onChange={(e) => setRaza(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Edad</label>
                  <input
                    type="number"
                    className="form-control"
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Dueño</label>
                  <input
                    type="text"
                    className="form-control"
                    value={dueño}
                    onChange={(e) => setDueño(e.target.value)}
                  />
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-success mt-3"
                    onClick={agregarMascota}
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
          <h3 className="text-center">Listado de Mascotas</h3>
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Raza</th>
                <th>Edad</th>
                <th>Dueño</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mascotas.map((mascota) => (
                <tr key={mascota.id}>
                  <td>{mascota.nombre}</td>
                  <td>{mascota.raza}</td>
                  <td>{mascota.edad}</td>
                  <td>{mascota.dueño}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => eliminarMascota(mascota.id)}
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

export default Mascotas;
