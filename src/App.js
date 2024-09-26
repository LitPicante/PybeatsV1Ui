import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Mascotas from './pages/Mascotas';
import Navbar from './components/Navbar';
import Clientes from './pages/Cliente';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './PrivateRoute';  // Importamos el componente PrivateRoute
import { ToastContainer } from 'react-toastify'; // Importamos ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Estilos de Toastify

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');

  // useEffect para actualizar el estado cuando el valor en localStorage cambia
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    };

    // Escucha los cambios en localStorage
    window.addEventListener('storage', checkAuth);

    // Verificar al cargar el componente
    checkAuth();

    // Limpiar el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Mostrar el ToastContainer globalmente para que las notificaciones persistan */}
        <ToastContainer 
          position="top-right" 
          autoClose={5000} 
          hideProgressBar={false} 
          newestOnTop={true} 
          closeOnClick 
          rtl={false} 
          pauseOnFocusLoss 
          draggable 
          pauseOnHover 
        />

        {/* Solo muestra el Navbar si el usuario está autenticado */}
        {isAuthenticated && <Navbar />}

        <header className="App-header">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            
            {/* Rutas públicas */}
            <Route path="/login" element={<Login setAccessToken={setIsAuthenticated} />} />
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
