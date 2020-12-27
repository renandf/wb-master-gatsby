import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import SEO from '../components/SEO';
import PizzaOrder from '../components/PizzaOrder';

import useForm from '../utils/useForm';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import calculateOrderTotal from '../utils/calculateOrderTotal';
import formatMoney from '../utils/formatMoney';
import usePizza from '../utils/usePizza';

import OrderStyles from '../styles/OrderStyles';
import MenuItemStyles from '../styles/MenuItemStyles';

export default function OrderPage({ data }) {
  const pizzas = data.pizzas.nodes;
  const { values, updateValues } = useForm({
    name: '',
    email: '',
  });
  const {
    order,
    error,
    loading,
    message,
    addToOrder,
    removeFromOrder,
    submitOrder,
  } = usePizza({
    pizzas,
    values,
  });

  if (message) {
    return <p>{message}</p>;
  }

  return (
    <>
      <SEO title="Order a pizza!" />
      <OrderStyles onSubmit={submitOrder}>
        <fieldset>
          <legend>Your info</legend>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={updateValues}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={updateValues}
          />
        </fieldset>
        <fieldset className="menu">
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <MenuItemStyles key={pizza.id}>
              <Img
                width="50"
                height="50"
                fluid={pizza.image.asset.fluid}
                alt={pizza.name}
              />
              <div>
                <h2>{pizza.name}</h2>
              </div>
              <div>
                {['S', 'M', 'L'].map((size) => (
                  <button
                    type="button"
                    key={size}
                    onClick={() =>
                      addToOrder({
                        id: pizza.id,
                        size,
                      })
                    }
                  >
                    {size} :{' '}
                    {formatMoney(calculatePizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset className="order">
          <legend>Order</legend>
          <PizzaOrder
            order={order}
            removeFromOrder={removeFromOrder}
            pizzas={pizzas}
          />
        </fieldset>
        <fieldset>
          <h3>
            Your total is {formatMoney(calculateOrderTotal(order, pizzas))}
          </h3>
          <div>{error ? <p>Error: {error}</p> : ''}</div>
          <button type="submit" disabled={loading}>
            {loading ? 'Placing order...' : 'Order Ahead'}
          </button>
        </fieldset>
      </OrderStyles>
    </>
  );
}

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
