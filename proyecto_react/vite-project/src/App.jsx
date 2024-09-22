import React from 'react';
import { ChakraProvider,Flex, Box, Button, Text } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';  // Asegúrate de importar 'Link'
import Producto from './Producto';
import Cliente from './Cliente';
import Pedido from './Pedido';
import './App.css';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Box p={4}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/productos" element={<Producto />} />
            <Route path="/clientes" element={<Cliente />} />
            <Route path="/pedidos" element={<Pedido />} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

function HomePage() {
  return (
    <Flex className="home-page">
      <Box className="home-box">
        <Text className="home-text">
          Bienvenido a la app de gestión
        </Text>

        <Button
          as={Link}
          to="/productos"
          colorScheme="teal"
          size="lg"
          variant="solid"
          className="home-button"
        >
          Ir a Productos
        </Button>

        <Button
          as={Link}
          to="/clientes"
          colorScheme="teal"
          size="lg"
          variant="solid"
          className="home-button"
        >
          Ir a Clientes
        </Button>

        <Button
          as={Link}
          to="/pedidos"
          colorScheme="teal"
          size="lg"
          variant="solid"
          className="home-button"
        >
          Ir a Pedidos
        </Button>
      </Box>
    </Flex>
  );
}

export default App;
