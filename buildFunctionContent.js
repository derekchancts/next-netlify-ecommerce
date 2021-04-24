const fs = require("fs");
const matter = require('gray-matter');


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

// console.log(getProducts());

// after deloying to Netlify, we get an error. Our function "charge-card" cannot read the files in content because
// Netilfy will turn it to a serverless function and it's location will be different
const filepath = `${process.cwd()}/functions/products.json`;
const products = getProducts();

fs.writeFileSync(filepath, JSON.stringify(products));