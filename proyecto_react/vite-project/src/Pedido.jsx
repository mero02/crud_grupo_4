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


const Pedido = () => {
  const [pedidos, setPedidos] = useState([]);
  const [nuevoPedido, setNuevoPedido] = useState({ cliente_id: '', producto_id: '' , cantidad: ''});
  const [pedidoEditando, setPedidoEditando] = useState(null);
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetch('http://localhost:8000/pedidos')
      .then(response => response.json())
      .then(data => setPedidos(data))
      .catch(error => setError(error.message));
  }, []);

  const handleAddPedido = () => {
    fetch('http://localhost:8000/pedidos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoPedido)
    })
      .then(response => response.json())
      .then(data => {
        setPedidos(prev => [...prev, data]);
        setNuevoPedido({  cliente_id: '', producto_id: '' , cantidad: '' });
      })
      .catch(error => setError(error.message));
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Desea eliminar este pedido?"))
    fetch(`http://localhost:8000/pedidos/${id}`, { method: 'DELETE' })
      .then(() => setPedidos(prev => prev.filter(pedido => pedido.id !== id)))
      .catch(error => setError(error.message));
  };
  
  const handleEdit = (id) => {
    const pedidoAEditar = pedidos.find(p => p.id === id);
    setPedidoEditando(pedidoAEditar);
    onOpen();
  };

  const handleUpdate = () => {
    fetch(`http://localhost:8000/pedidos/${pedidoEditando.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedidoEditando)
    })
      .then(response => response.json())
      .then(data => {
        setPedidos(prev => prev.map(p => p.id === data.id ? data : p));
        onClose();
      })
      .catch(error => setError(error.message));
  };

  if (error) return <Text>Error: {error}</Text>;
  

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
        {/* Columna izquierda: Agregar nuevo pedido */}
        <Box width="40%" pr={4} overflowY="auto">
          <Box p={4} borderWidth="1px" borderRadius="lg" mb={4}>
            <Text fontSize="xl" mb={4}>Agregar Nuevo Pedido</Text>
            <FormControl>
              <FormLabel>Cliente</FormLabel>
              <Input
                value={nuevoPedido.cliente_id}
                onChange={(e) => setNuevoPedido({ ...nuevoPedido, cliente_id: e.target.value })}
                placeholder="Id Cliente"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Producto</FormLabel>
              <Input
                value={nuevoPedido.producto_id}
                onChange={(e) => setNuevoPedido({ ...nuevoPedido, producto_id: e.target.value })}
                placeholder="Id Producto"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Cantidad</FormLabel>
              <Input
                value={nuevoPedido.cantidad}
                onChange={(e) => setNuevoPedido({ ...nuevoPedido, cantidad: e.target.value })}
                placeholder="Cantidad"
              />
            </FormControl>
            <Button mt={4} colorScheme="teal" onClick={handleAddPedido}>Agregar Pedido</Button>
          </Box>
        </Box>
        {/* Lista de Pedidos */}
        <Box p={4} borderWidth="1px" borderRadius="lg">
          <Text fontSize="xl" mb={4}>Lista de Pedidos</Text>
          {pedidos.length ? (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Id_Cliente</Th>
                  <Th>Id_Producto</Th>
                  <Th>Cantidad</Th>
                  <Th>Acciones</Th>
                </Tr>
              </Thead>
              <Tbody>
                {pedidos.map(pedido => (
                  <Tr key={pedido.id}>
                    <Td>{pedido.cliente_id}</Td>
                    <Td>{pedido.producto_id}</Td>
                    <Td>{pedido.cantidad}</Td>
                    <Td>
                      <Button colorScheme="blue" size="sm" onClick={() => handleEdit(pedido.id)}>Editar</Button>
                      <Button colorScheme="red" size="sm" ml={2} onClick={() => handleDelete(pedido.id)}>Eliminar</Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Text>No hay pedidos disponibles.</Text>
          )}
        </Box>
      </Flex>
  
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Pedido</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Cliente</FormLabel>
              <Input
                value={pedidoEditando?.cliente_id || ''}
                onChange={(e) => setPedidoEditando({ ...pedidoEditando, cliente_id: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Producto</FormLabel>
              <Input
                value={pedidoEditando?.producto_id || ''}
                onChange={(e) => setPedidoEditando({ ...pedidoEditando, producto_id: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Cantidad</FormLabel>
              <Input
                value={pedidoEditando?.cantidad || ''}
                onChange={(e) => setPedidoEditando({ ...pedidoEditando, cantidad: e.target.value })}
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

export default Pedido;