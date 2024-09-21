import React, { useState, useEffect } from 'react';
import {
  Box, Text, Button, Input, FormControl, FormLabel, Flex, Grid, GridItem,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  useDisclosure, Table, Thead, Tbody, Tr, Th, Td, Icon
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import { FaHome } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);


const Producto = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', precio: '' });
  const [productoEditando, setProductoEditando] = useState(null);
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetch('http://localhost:8000/productos')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => setError(error.message));
  }, []);

  const handleAddProduct = () => {
    fetch('http://localhost:8000/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoProducto)
    })
      .then(response => response.json())
      .then(data => {
        setProductos(prev => [...prev, data]);
        setNuevoProducto({ nombre: '', precio: '' });
      })
      .catch(error => setError(error.message));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/productos/${id}`, { method: 'DELETE' })
      .then(() => setProductos(prev => prev.filter(producto => producto.id !== id)))
      .catch(error => setError(error.message));
  };

  const handleEdit = (id) => {
    const productoAEditar = productos.find(p => p.id === id);
    setProductoEditando(productoAEditar);
    onOpen();
  };

  const handleUpdate = () => {
    fetch(`http://localhost:8000/productos/${productoEditando.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productoEditando)
    })
      .then(response => response.json())
      .then(data => {
        setProductos(prev => prev.map(p => p.id === data.id ? data : p));
        onClose();
      })
      .catch(error => setError(error.message));
  };

  // Datos para el gráfico de barras
  const barData = {
    labels: productos.map(p => p.nombre),
    datasets: [
      {
        label: 'Precio',
        data: productos.map(p => p.precio),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  // Datos para el gráfico circular
  const pieData = {
    labels: productos.map(p => p.nombre),
    datasets: [
      {
        data: productos.map(p => p.precio),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Datos para el gráfico de líneas (asumiendo que tenemos fechas de creación para los productos)
  const lineData = {
    labels: productos.map((_, index) => `Producto ${index + 1}`),
    datasets: [
      {
        label: 'Tendencia de Precios',
        data: productos.map(p => p.precio),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  if (error) return <Text>Error: {error}</Text>;
  if (!productos.length) return <Text>No hay productos disponibles.</Text>;

  return (
    <Flex direction="column" height="100vh" p={4}>
      <Button
        as={Link}
        to="/"
        leftIcon={<Icon as={FaHome} />}
        colorScheme="blue"
        variant="outline"
        mb={4}
        alignSelf="flex-start"
        borderRadius="full"
        px={6}
        _hover={{
          bg: 'blue.50',
          transform: 'translateY(-2px)',
          boxShadow: 'md',
        }}
        transition="all 0.2s"
      >
        Inicio
      </Button>

      <Flex flex={1}>
        {/* Columna izquierda: Lista de productos */}
        <Box width="40%" pr={4} overflowY="auto">
          <Box p={4} borderWidth="1px" borderRadius="lg" mb={4}>
            <Text fontSize="xl" mb={4}>Agregar Nuevo Producto</Text>
            <FormControl>
              <FormLabel>Nombre</FormLabel>
              <Input
                value={nuevoProducto.nombre}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
                placeholder="Nombre del producto"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Precio</FormLabel>
              <Input
                value={nuevoProducto.precio}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
                placeholder="Precio del producto"
              />
            </FormControl>
            <Button mt={4} colorScheme="teal" onClick={handleAddProduct}>Agregar Producto</Button>
          </Box>

          <Box p={4} borderWidth="1px" borderRadius="lg">
            <Text fontSize="xl" mb={4}>Lista de Productos</Text>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Nombre</Th>
                  <Th>Precio</Th>
                  <Th>Acciones</Th>
                </Tr>
              </Thead>
              <Tbody>
                {productos.map(producto => (
                  <Tr key={producto.id}>
                    <Td>{producto.nombre}</Td>
                    <Td>{producto.precio}</Td>
                    <Td>
                      <Button colorScheme="blue" size="sm" onClick={() => handleEdit(producto.id)}>Editar</Button>
                      <Button colorScheme="red" size="sm" ml={2} onClick={() => handleDelete(producto.id)}>Eliminar</Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>

        {/* Columna derecha: Gráficos */}
        <Box width="60%" pl={4}>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem colSpan={2}>
              <Box p={4} borderWidth="1px" borderRadius="lg">
                <Text fontSize="xl" mb={4}>Gráfico de Barras - Precios de Productos</Text>
                <Bar data={barData} />
              </Box>
            </GridItem>
            <GridItem colSpan={1}>
              <Box p={4} borderWidth="1px" borderRadius="lg">
                <Text fontSize="xl" mb={4}>Gráfico Circular - Distribución de Precios</Text>
                <Pie data={pieData} />
              </Box>
            </GridItem>
            <GridItem colSpan={1}>
              <Box p={4} borderWidth="1px" borderRadius="lg">
                <Text fontSize="xl" mb={4}>Gráfico de Líneas - Tendencia de Precios</Text>
                <Line data={lineData} />
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Producto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Nombre</FormLabel>
              <Input
                value={productoEditando?.nombre || ''}
                onChange={(e) => setProductoEditando({...productoEditando, nombre: e.target.value})}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Precio</FormLabel>
              <Input
                value={productoEditando?.precio || ''}
                onChange={(e) => setProductoEditando({...productoEditando, precio: e.target.value})}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
              Guardar
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
export default Producto;