import React from 'react';
import PropTypes from 'prop-types';
import './Producto.css';

function Producto({ data, onDelete, onEdit }) {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(data.id);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(data);
    }
  };

  return (
    <div className="producto">
      <p>ID: {data?.id}</p>
      <p>Nombre: {data?.nombre}</p>
      <p>Precio: {data?.precio}</p>
      <button onClick={handleEdit} className="edit-btn">Editar</button>
      <button onClick={handleDelete} className="delete-btn">Eliminar</button>
    </div>
  );
}

Producto.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    nombre: PropTypes.string,
    precio: PropTypes.number,
  }),
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default Producto;