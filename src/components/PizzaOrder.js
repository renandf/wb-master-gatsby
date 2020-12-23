import React from 'react';
import Img from 'gatsby-image';

import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

import MenuItemStyles from '../styles/MenuItemStyles';

export default function PizzaOrder({ order, pizzas, removeFromOrder }) {
  return (
    <>
      {order.map((orderItem, index) => {
        const pizza = pizzas.find((p) => p.id === orderItem.id);
        return (
          <MenuItemStyles key={orderItem.id}>
            <Img fluid={pizza.image.asset.fluid} />
            <h2>{pizza.name}</h2>
            <p>
              {orderItem.size} :{' '}
              {formatMoney(calculatePizzaPrice(pizza.price, orderItem.size))}
              <button
                type="button"
                className="remove"
                title={`Remove ${pizza.name} ${orderItem.size} from order`}
                onClick={() => removeFromOrder(index)}
              >
                &times;
              </button>
            </p>
          </MenuItemStyles>
        );
      })}
    </>
  );
}
