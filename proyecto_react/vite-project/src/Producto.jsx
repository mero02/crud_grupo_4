import PropTypes from 'prop-types';
import './Producto.css';

function Producto({ data }) {
  return (
    <div className="producto">
      <p>ID: {data?.id}</p>
      <p>Nombre: {data?.nombre}</p>
      <p>Email: {data?.precio}</p>
    </div>
  );
}

Producto.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    nombre: PropTypes.string,
    precio: PropTypes.int,
  })
};

export default Producto;