import React from 'react';

import CartItem from './CartItem';
import Cart from './Cart';
import Navbar from './Navbar';

class App extends React.Component {

  // Constructor
  constructor() {
    super();
    this.state = {
      products: [
        {
          price: 999,
          title: "Watch",
          qty: 1,
          img: "https://media.istockphoto.com/id/1359180038/photo/wristwatch.webp?s=612x612&w=is&k=20&c=UHBwCGd9I7t2GuWpGUX_nJRnpc-DNtwpwCQ-oykBVtM=",
          id: 1
        },
        {
          price: 999,
          title: "Mobile Phone",
          qty: 10,
          img: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
          id: 2
        },
        {
          price: 999,
          title: "Laptop",
          qty: 4,
          img: "https://media.istockphoto.com/photos/modern-laptop-with-empty-screen-on-white-background-mockup-design-picture-id1182241805",
          id: 3
        },
      ]
    }
  }

  handleIncreasedQuantity = (product) => {
    console.log("Hey please increase quantity of ", product);
    const { products } = this.state;
    const index = products.indexOf(product);
    products[index].qty += 1;

    this.setState({
      // products: products
      // benefit of having key value pair, same name
      products
    });
  }

  handleDecreasedQuantity = (product) => {

    console.log("Hey please decrease quantity of ", product);
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty == 0) {
      return;
    }

    products[index].qty -= 1;

    this.setState({
      products
    });
  }

  handleDeleteProduct = (id) => {
    const { products } = this.state;

    const items = products.filter((item) => item.id !== id);
    // it returns another array, which contain products whose id is not equal to the id is passed
    this.setState({
      products: items
    })
  }

  getCartCount = () => {
    const { products } = this.state;

    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    });

    return count;
  }

  getCartTotal = () => {
    const { products } = this.state;

    let cartTotal = 0;

    products.map((product) => {
      cartTotal = cartTotal + product.qty * product.price
    })
    // return "cartTotal";
    return '';
  }

  render() {

    const { products } = this.state;

    return (
      <div className="App">
        {/* <h1>Cart</h1> */}
        <Navbar count={this.getCartCount()} />
        <Cart
          products={products}
          onIncreasedQuantity={this.handleIncreasedQuantity}
          onDecreasedQuantity={this.handleDecreasedQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />

        <div style={{ padding: 10, fontSize: 20 }}>Total : {this.getCartTotal()}</div>

      </div>
    );

  }

}



export default App;

// we r getting
        // onIncreasedQuantity={props.onIncreasedQuantity}
        // onDecreasedQuantity={props.onDecreasedQuantity}
        // onDeleteProduct={props.onDeleteProduct}
// these functions via props from App and we r passing it down to cartitem with the same name