import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
// import { isAuthenticated } from '../utils/auth';
import {verificarTokenUser} from 'utils/utils.js'


const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);


    const checkAuth = async () => {
        const isTokenValid = await verificarTokenUser();

        // console.log('ProtectedRoute...')
        // console.log(isTokenValid)

        // console.log("isAuthenticated A ")
        // console.log(isAuthenticated)

        setIsAuthenticated(isTokenValid);
      
        // console.log("isAuthenticated B")
        // console.log(isAuthenticated)

        setLoading(false);
    };
    useEffect(() => {

        checkAuth();
    }, []); 
   
    // Verificamos si el usuario está autenticado   
    
    // console.log("isAuthenticated")
    // console.log(isAuthenticated)

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!isAuthenticated) {
        // Si no está autenticado, lo redirigimos al login
        return <Navigate to="/login" replace />;
    }
    // Si está autenticado, renderizamos la página solicitada
    return children;
};

export default ProtectedRoute;