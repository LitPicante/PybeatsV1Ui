import React, { useState } from 'react';

const Mascotas = () => {
  const [mascotas, setMascotas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [raza, setRaza] = useState('');
  const [edad, setEdad] = useState('');
  const [dueño, setDueño] = useState('');

  const agregarMascota = () => {
    const nuevaMascota = { nombre, raza, edad, dueño };
    setMascotas([...mascotas, nuevaMascota]);
    // Limpiar los campos del formulario
    setNombre('');
    setRaza('');
    setEdad('');
    setDueño('');
  };

  const eliminarMascota = (index) => {
    const nuevasMascotas = mascotas.filter((_, i) => i !== index);
    setMascotas(nuevasMascotas);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center">
              <h3>ABM de mascotas</h3>
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
                    type="text"
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
              {mascotas.map((mascota, index) => (
                <tr key={index}>
                  <td>{mascota.nombre}</td>
                  <td>{mascota.raza}</td>
                  <td>{mascota.edad}</td>
                  <td>{mascota.dueño}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => eliminarMascota(index)}
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
