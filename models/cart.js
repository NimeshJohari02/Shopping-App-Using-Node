const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addProduct(id, price) {
    fs.readFile(p, (err, file) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(file);
      }
      const exProIndex = cart.products.findIndex(
        (product) => product.id === id
      );
      const exPro = cart.products[exProIndex];

      let updatedProduct;
      if (exPro) {
        updatedProduct = { ...exPro };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[exProIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products];
      }
      cart.totalPrice = cart.totalPrice + price;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
};
