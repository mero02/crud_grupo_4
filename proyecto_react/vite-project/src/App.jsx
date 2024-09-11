import React, { useState, useEffect } from 'react';
import './App.css'
import './Producto.css'; 
import Producto from './Producto'
import ProductForm from './ProductForm';
import EditProductForm from './EditProductForm';

function App() {
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProductos = () => {
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
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleProductAdded = (newProduct) => {
    setProductos([...productos, newProduct]);
  };

  const handleProductDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/productos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      setProductos(productos.filter(producto => producto.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      setError(error.message);
    }
  };

  const handleProductEdit = (product) => {
    setEditingProduct(product);
  };

  const handleProductUpdate = async (updatedProduct) => {
    try {
      const response = await fetch(`http://localhost:8000/productos/${updatedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const updatedProductData = await response.json();
      setProductos(productos.map(p => p.id === updatedProductData.id ? updatedProductData : p));
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
      setError(error.message);
    }
  };

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-5 grid-rows-5 gap-4">
      <div className="col-span-3 row-span-4">
        <h1>Lista de Productos</h1>
        <div className="productos">
          {productos.length > 0 ? (
            productos.map(producto => (
              <Producto 
                key={producto.id} 
                data={producto} 
                onDelete={handleProductDelete}
                onEdit={handleProductEdit}
              />
            ))
          ) : (
            <p>No se encontraron productos.</p>
          )}
        </div>
      </div>
      <div className="col-span-2 row-span-4">
        {editingProduct ? (
          <>
            <h2>Editar Producto</h2>
            <EditProductForm 
              product={editingProduct}
              onSave={handleProductUpdate}
              onCancel={() => setEditingProduct(null)}
            />
          </>
        ) : (
          <>
            <h2>Agregar Nuevo Producto</h2>
            <ProductForm onProductAdded={handleProductAdded} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
