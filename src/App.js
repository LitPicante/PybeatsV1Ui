import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Mascotas from './pages/Mascotas';
import Navbar from './components/Navbar';
import Clientes from './pages/Cliente';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './PrivateRoute';  // Importamos el componente PrivateRoute

function App() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <Router>
      <div className="App">
        {/* Solo muestra el Navbar si el usuario está autenticado */}
        {isAuthenticated && <Navbar />}
        
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            
            {/* Rutas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rutas privadas */}
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/productos"
              element={
                <PrivateRoute>
                  <Productos />
                </PrivateRoute>
              }
            />
            <Route
              path="/mascotas"
              element={
                <PrivateRoute>
                  <Mascotas />
                </PrivateRoute>
              }
            />
            <Route
              path="/clientes"
              element={
                <PrivateRoute>
                  <Clientes />
                </PrivateRoute>
              }
            />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
