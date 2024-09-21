import React from 'react';
import { ChakraProvider,Flex, Box, Button, Text } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';  // Asegúrate de importar 'Link'
import Producto from './Producto';
import Cliente from './Cliente';
import Pedido from './Pedido';

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
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"  // Asegura que ocupe toda la altura de la pantalla
      bg="gray.50"
    >
      <Box
        textAlign="center"
        p={5}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        maxW={{ base: '90%', md: '500px' }} // Adaptable para móviles y tablets
        w="100%"
        bg="white"
      >
        <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" mb={5}>
          Bienvenido a la app de gestión
        </Text>

        <Button
          as={Link}
          to="/productos"
          colorScheme="teal"
          size="lg"
          variant="solid"
          mb={3}
          w="100%"
        >
          Ir a Productos
        </Button>

        <Button
          as={Link}
          to="/clientes"
          colorScheme="blue"
          size="lg"
          variant="outline"
          mb={3}
          w="100%"
        >
          Ir a Clientes
        </Button>

        <Button
          as={Link}
          to="/pedidos"
          colorScheme="purple"
          size="lg"
          variant="ghost"
          w="100%"
        >
          Ir a Pedidos
        </Button>
      </Box>
    </Flex>
  );
}

export default App;
