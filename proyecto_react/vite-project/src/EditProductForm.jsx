import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function EditProductForm({ product, onSave, onCancel }) {
  const [nombre, setNombre] = useState(product.nombre);
  const [precio, setPrecio] = useState(product.precio);

  useEffect(() => {
    setNombre(product.nombre);
    setPrecio(product.precio);
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...product,
      nombre,
      precio: Number(precio),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="edit-product-form">
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
      <button type="submit">Guardar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
}

EditProductForm.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    nombre: PropTypes.string,
    precio: PropTypes.number,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditProductForm;