const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `<div>
      <style>
        ul {
          list-style: none;
        }
      </style>
      <h2>Your recent order for ${total}</h2>
      <p>Please start walking over, we will have your order ready in the next 20 minutes.</p>
      <ul>
        ${order
          .map(
            (item) => `<li>
          <img src="${item.thumbnail}" alt="${item.name}" />
          ${item.size} : ${item.name} - ${item.price}
        </li>`
          )
          .join('')}
      </ul>
      <p>Your total is <strong>$${total}</strong> due at pickup</p>
    </div>`;
}

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// function wait(ms = 0) {
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve, ms);
//   });
// }

exports.handler = async (event, context) => {
  // await wait(5000);
  const body = JSON.parse(event.body);

  // check if bot was caught on honeypot field
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Boop beeb bop zzzzst... you shall not pass`,
      }),
    };
  }

  // check for required fields
  const requiredFields = ['email', 'name'];

  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field`,
        }),
      };
    }
  }

  // check if order is empty
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `There are no pizzas in your order`,
      }),
    };
  }

  // Test send an email
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New Order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
