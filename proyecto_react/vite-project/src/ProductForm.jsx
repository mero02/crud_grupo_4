import React, { useState } from 'react';

const ProductForm = ({ onProductAdded }) => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = { nombre, precio: parseFloat(precio) };
    
    try {
      const response = await fetch('http://localhost:8000/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add product');
      }
      
      const addedProduct = await response.json();
      onProductAdded(addedProduct);
      setNombre('');
      setPrecio('');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre del producto"
        required
      />
      <input
        type="number"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        placeholder="Precio"
        step="0.01"
        required
      />
      <button type="submit">Agregar Producto</button>
    </form>
  );
};

export default ProductForm;