import React, { useState, useEffect } from 'react';
import {
  Button,Flex, Icon
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import { FaHome } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const Pedido = () => {
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

      

    </Flex>
  );
};

export default Pedido;