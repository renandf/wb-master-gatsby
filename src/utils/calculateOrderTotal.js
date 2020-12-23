import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculateOrderTotal(order, pizzas) {
  return order.reduce((runningTotal, orderItem) => {
    const pizza = pizzas.find((p) => p.id === orderItem.id);
    return runningTotal + calculatePizzaPrice(pizza.price, orderItem.size);
  }, 0);
}
