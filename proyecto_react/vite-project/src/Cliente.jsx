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


const Cliente = () => {
  const [clientes, setClientes] = useState([]);
  const [nuevoCliente, setNuevoCliente] = useState({ nombre: '', email: '' });
  const [clienteEditando, setClienteEditando] = useState(null);
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetch('http://localhost:8000/clientes')
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => setError(error.message));
  }, []);

  const handleAddCliente = () => {
    fetch('http://localhost:8000/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoCliente)
    })
      .then(response => response.json())
      .then(data => {
        setClientes(prev => [...prev, data]);
        setNuevoCliente({ nombre: '', email: '' });
      })
      .catch(error => setError(error.message));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/clientes/${id}`, { method: 'DELETE' })
      .then(() => setClientes(prev => prev.filter(cliente => cliente.id !== id)))
      .catch(error => setError(error.message));
  };
  
  const handleEdit = (id) => {
    const clienteAEditar = clientes.find(p => p.id === id);
    setClienteEditando(clienteAEditar);
    onOpen();
  };

  const handleUpdate = () => {
    fetch(`http://localhost:8000/clientes/${clienteEditando.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clienteEditando)
    })
      .then(response => response.json())
      .then(data => {
        setClientes(prev => prev.map(p => p.id === data.id ? data : p));
        onClose();
      })
      .catch(error => setError(error.message));
  };

  if (error) return <Text>Error: {error}</Text>;
  if (!clientes.length) return <Text>No hay clientes disponibles.</Text>;

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
        {/* Columna izquierda: Lista de clientes */}
        <Box width="40%" pr={4} overflowY="auto">
          <Box p={4} borderWidth="1px" borderRadius="lg" mb={4}>
            <Text fontSize="xl" mb={4}>Agregar Nuevo Cliente</Text>
            <FormControl>
              <FormLabel>Nombre</FormLabel>
              <Input
                value={nuevoCliente.nombre}
                onChange={(e) => setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })}
                placeholder="Nombre del cliente"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                value={nuevoCliente.email}
                onChange={(e) => setNuevoCliente({ ...nuevoCliente, email: e.target.value })}
                placeholder="Email del cliente"
              />
            </FormControl>
            <Button mt={4} colorScheme="teal" onClick={handleAddCliente}>Agregar Cliente</Button>
          </Box>
        </Box>
      
      <Box p={4} borderWidth="1px" borderRadius="lg">
            <Text fontSize="xl" mb={4}>Lista de Clientes</Text>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Nombre</Th>
                  <Th>Email</Th>
                  <Th>Acciones</Th>
                </Tr>
              </Thead>
              <Tbody>
                {clientes.map(cliente => (
                  <Tr key={cliente.id}>
                    <Td>{cliente.nombre}</Td>
                    <Td>{cliente.email}</Td>
                    <Td>
                      <Button colorScheme="blue" size="sm" onClick={() => handleEdit(cliente.id)}>Editar</Button>
                      <Button colorScheme="red" size="sm" ml={2} onClick={() => handleDelete(cliente.id)}>Eliminar</Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
      </Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Cliente</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Nombre</FormLabel>
              <Input
                value={clienteEditando?.nombre || ''}
                onChange={(e) => setClienteEditando({...clienteEditando, nombre: e.target.value})}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                value={clienteEditando?.email || ''}
                onChange={(e) => setClienteEditando({...clienteEditando, email: e.target.value})}
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

export default Cliente;