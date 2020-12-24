import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';

export default function usePizza({ pizzas, inputs }) {
  const [order, setOrder] = useContext(OrderContext);

  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }

  function removeFromOrder(index) {
    setOrder([
      // everything before item to be removed
      ...order.slice(0, index),
      // everything after item to be removed
      ...order.slice(index + 1),
    ]);
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
