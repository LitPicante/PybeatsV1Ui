import React from 'react';

// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // antes

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Importa Navigate para redireccionar

import Home from './pages/Home';  // Asegúrate de que esta ruta sea correcta

import Productos from './pages/Productos';  // Asegúrate de que esta ruta sea correcta

import Mascotas from './pages/Mascotas';

import Navbar from './components/Navbar';

// import { ToastContainer } from 'react-toastify';

// import 'react-toastify/dist/ReactToastify.css';

//import Navbar from './components/Navbar';  // Importa el Navbar



function App() {
  return (
    <Router>
      <div className="App">
        {/*<ToastContainer />*/}
        <header className="App-header">
        <Navbar />  {/* Incluye el Navbar aquí */}
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/mascotas" element={<Mascotas />} />

          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
