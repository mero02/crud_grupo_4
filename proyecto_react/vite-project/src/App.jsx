import React, { useState, useEffect } from 'react';
import './App.css'
import './Producto.css'; 
import Producto from './Producto'

function App() {
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:8000/productos')
      .then(response => response.json())
      .then(data => {
        console.log('Datos recibidos:', data);
        setProductos(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener productos:', error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="grid grid-cols-5 grid-rows-5 gap-4">
      <div className="col-span-3 row-span-4">
        <h1>Lista de Productos</h1>
        <div className="productos">
          {productos.length > 0 ? (
            productos.map(productos => (
              <Producto key={productos.id} data={productos} />
            ))
          ) : (
            <p>No se encontraron productos.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
