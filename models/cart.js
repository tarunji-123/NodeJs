// const fs = require('fs');
// const path = require('path');

// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   'data',
//   'cart.json'
// );

// module.exports = class Cart {
//   static addProduct(id, productPrice) {
//     // Fetch the previous cart
//     fs.readFile(p, (err, fileContent) => {
//       let cart = { products: [], totalPrice: 0 };
//       if (!err) {
//         cart = JSON.parse(fileContent);
//       }
//       // Analyze the cart => Find existing product
//       const existingProductIndex = cart.products.findIndex(
//         prod => prod.id === id
//       );
//       const existingProduct = cart.products[existingProductIndex];
//       let updatedProduct;
//       // Add new product/ increase quantity
//       if (existingProduct) {
//         updatedProduct = { ...existingProduct };
//         updatedProduct.qty = updatedProduct.qty + 1;
//         cart.products = [...cart.products];
//         cart.products[existingProductIndex] = updatedProduct;
//       } else {
//         updatedProduct = { id: id, qty: 1 };
//         cart.products = [...cart.products, updatedProduct];
//       }
//       cart.totalPrice = cart.totalPrice + +productPrice;
//       fs.writeFile(p, JSON.stringify(cart), err => {
//         console.log(err);
//       });
//     });
//   }

//   static deleteProduct(id, productPrice) {
//     fs.readFile(p, (err, fileContent) => {
//       if (err) {
//         return;
//       }
//       const updatedCart = { ...JSON.parse(fileContent) };
//       const product = updatedCart.products.find(prod => prod.id === id);
//       if (!product) {
//           return;
//       }
//       const productQty = product.qty;
//       updatedCart.products = updatedCart.products.filter(
//         prod => prod.id !== id
//       );
//       updatedCart.totalPrice =
//         updatedCart.totalPrice - productPrice * productQty;

//       fs.writeFile(p, JSON.stringify(updatedCart), err => {
//         console.log(err);
//       });
//     });
//   }

//   static getCart(cb) {
//     fs.readFile(p, (err, fileContent) => {
//       const cart = JSON.parse(fileContent);
//       if (err) {
//         cb(null);
//       } else {
//         cb(cart);
//       }
//     });
//   }
// };


const db = require('../util/database');

module.exports = class Cart {
  static addProduct(id, productPrice) {
    return db.execute('SELECT * FROM cart WHERE id = ?', [id])
      .then(([rows]) => {
        if (rows.length > 0) {
          // The product already exists in the cart, update the quantity
          const newQuantity = rows[0].quantity + 1;
          return db.execute('UPDATE cart SET quantity = ? WHERE id = ?', [newQuantity, id]);
        } else {
          // The product doesn't exist in the cart, insert a new row
          return db.execute('INSERT INTO cart (id, quantity) VALUES (?, 1)', [id]);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  static deleteProduct(id, productPrice) {
    return db.execute('SELECT * FROM cart WHERE id = ?', [id])
      .then(([rows]) => {
        if (rows.length > 0) {
          const currentQuantity = rows[0].quantity;
          if (currentQuantity === 1) {
            // If there's only one of this product, delete the row from the cart
            return db.execute('DELETE FROM cart WHERE id = ?', [id]);
          } else {
            // If there are multiple quantities, decrement the quantity by 1
            const newQuantity = currentQuantity - 1;
            return db.execute('UPDATE cart SET quantity = ? WHERE id = ?', [newQuantity, id]);
          }
        } else {
          // The product doesn't exist in the cart, do nothing
          return;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  static getCart() {
    return db.execute('SELECT * FROM cart')
      .then(([rows]) => {
        return rows;
      })
      .catch(err => {
        console.log(err);
      });
  }
};