const fs = require("fs");
const matter = require('gray-matter');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);


const getProducts = () => {
  const directory = `${process.cwd()}/content`;
  const filenames = fs.readdirSync(directory);
  // console.log(filenames)

  const products = filenames.map((filename) => {
    // (1) read the file from fs
    const fileContent = fs.readFileSync(`${directory}/${filename}`).toString(); // turn everything to a (big) string
    // console.log(fileContent);

    // (2) pull out frontmatter => name
    // npm install react-markdown - this has a function which allows to pull the data between the 3 dashes
    // and turn them into separate variables. In our case - name, description, and price
    // we also get the content
    const { data } = matter(fileContent);
    // console.log(data)

    return data;
  });
  // console.log(products);

  return products;
};


exports.handler = async (event, context) => {
  // console.log(event.body);
  // const { cart } =  event.body; 
  const { newCart } = JSON.parse(event.body);  // event.body is a string (using Stringify). So, we need to change it to an object
  // console.log(newCart)

  const products = getProducts();
  // console.log(products);

  const cartWithProducts = newCart.map(({ id, qty }) => {
    const product = products.find(product => product.id === id);
    return {
      ...product,
      qty
    }
  });
  // console.log(cartWithProducts);

  // let total = 0;
  // cartWithProducts.map(product => {
  //   return total = total + (product.price * product.qty);
  // })
  // cartWithProducts.map(product => total += (product.price * product.qty) )
  // console.log(total);


  // TALKING TO STRIPE
  // lineItems will be an array with all the products from the cart, formated in the below structure
  const lineItems = cartWithProducts.map(product => ({ 
    price_data: {
      currency: 'usd',
      product_data: {
        name: product.name
      },
      unit_amount: product.price,
    },
    quantity: product.qty,
  }));


  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.URL}/success`,
    cancel_url: `${process.env.URL}/cancelled`,
  })
  // if running on localhost, will get port 8888. If in Production, will be assigned the host's URL
  // success_url: `${event.headers.host}/success`,
  // cancel_url: `${event.headers.host}/cancelled`,

 
  // CHARGING THE CARD
  return {
    statusCode: 200,
    body: JSON.stringify({
      id: session.id,
    }),
  };
};
