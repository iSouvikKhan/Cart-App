import React from 'react';

import CartItem from './CartItem';
import Cart from './Cart';
import Navbar from './Navbar';
// import * as firebase from 'firebase';
import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
import 'firebase/compat/firestore';

class App extends React.Component {

  // Constructor
  constructor() {
    super();
    this.state = {
      // products: [
      //   {
      //     price: 999,
      //     title: "Watch",
      //     qty: 1,
      //     img: "https://media.istockphoto.com/id/1359180038/photo/wristwatch.webp?s=612x612&w=is&k=20&c=UHBwCGd9I7t2GuWpGUX_nJRnpc-DNtwpwCQ-oykBVtM=",
      //     id: 1
      //   },
      //   {
      //     price: 999,
      //     title: "Mobile Phone",
      //     qty: 10,
      //     img: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      //     id: 2
      //   },
      //   {
      //     price: 999,
      //     title: "Laptop",
      //     qty: 4,
      //     img: "https://media.istockphoto.com/photos/modern-laptop-with-empty-screen-on-white-background-mockup-design-picture-id1182241805",
      //     id: 3
      //   },
      // ]
      products: [],
      loading: true
    }
    // this.db = firebase.firestore(); // u can use yhis too, just replace firebase.firestore() with this.db, presently I an not using it
  }

  // Lifecycle Method
  componentDidMount() {

    // firebase
    //   .firestore()
    //   .collection("products") // returns reference of the collection
    //   .get() // returns a promise
    //   .then((snapshot) => {
    //     console.log(snapshot);

    //     snapshot.docs.map((doc) => {
    //       console.log(doc.data());
    //     })

    //     const products = snapshot.docs.map((doc) => {
    //       const data = doc.data();

    //       data['id'] = doc.id;
    //       return data;
    //     })

    //     this.setState({
    //       products, // means products : products ( we have done it earlier )
    //       loading: false
    //     })
    //   })

    // no need to refresh page again again when db updates
    firebase
      .firestore()
      .collection("products") // returns reference of the collection

      // Quering in firebase
      // .where("price", "==", 999)

      .onSnapshot((snapshot) => {  // method which attaches query snapshot listener
        console.log(snapshot);

        snapshot.docs.map((doc) => {
          console.log(doc.data());
        })

        const products = snapshot.docs.map((doc) => {
          const data = doc.data();

          data['id'] = doc.id;
          return data;
        })

        this.setState({
          products, // means products : products ( we have done it earlier )
          loading: false
        })
      })

  }

  handleIncreasedQuantity = (product) => {
    console.log("Hey please increase quantity of ", product);
    const { products } = this.state;
    const index = products.indexOf(product);

    // it updates qty only on UI, lets do it in Firebase too
    // products[index].qty += 1;
    // this.setState({
    //   // products: products
    //   // benefit of having key value pair, same name
    //   products
    // });

    // we will get the reference of that particular document in firebase
    const docrefid = firebase.firestore().collection("products").doc(products[index].id);
    docrefid
      .update({  // update the data and returns promise
        qty: products[index].qty + 1
      })
      .then(() => {
        console.log("Quantity increased successfully");
      })
      .catch((error) => {
        console.log("Error :", error);
      })

  }

  handleDecreasedQuantity = (product) => {

    console.log("Hey please decrease quantity of ", product);
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty == 0) {
      return;
    }

    // products[index].qty -= 1;
    // this.setState({
    //   products
    // });

    const docrefid = firebase.firestore().collection("products").doc(products[index].id);
    docrefid
      .update({  // update the data and returns promise
        qty: products[index].qty - 1
      })
      .then(() => {
        console.log("Quantity decreased successfully");
      })
      .catch((error) => {
        console.log("Error :", error);
      })

  }

  handleDeleteProduct = (id) => {
    const { products } = this.state;

    // const items = products.filter((item) => item.id !== id);
    // // it returns another array, which contain products whose id is not equal to the id is passed
    // this.setState({
    //   products: items
    // })

    const docrefid = firebase.firestore().collection("products").doc(id);
    docrefid
      .delete()
      .then(() => {
        console.log("Deleted successfully");
      })
      .catch((error) => {
        console.log("Error :", error);
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
    return cartTotal;
    // return '';
  }

  addProduct = () => {
    firebase
      .firestore()
      .collection("products")
      .add({ // returrns a promise
        img: "https://images.samsung.com/is/image/samsung/p6pim/in/ww80t604dlb-tl/gallery/in-front-loading-washer-ww10t604clhs4-374537-ww80t604dlb-tl-383418721?$720_576_PNG$",
        price: 900,
        qty: 3,
        title: "Washing Machine"
      })
      .then((docRef) => {
        console.log("Product has been added", docRef);
      })
      .catch((error) => {
        console.log("Error :", error);
      })
  }

  render() {

    const { products, loading } = this.state;

    return (
      <div className="App">
        {/* <h1>Cart</h1> */}
        <Navbar count={this.getCartCount()} />
        <button onClick={this.addProduct} style={{ padding: 20, fontSize: 20 }}>Add Product</button>
        <Cart
          products={products}
          onIncreasedQuantity={this.handleIncreasedQuantity}
          onDecreasedQuantity={this.handleDecreasedQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        {loading && <h1>Loading Products...</h1>}
        {/* Conditional rendering */}

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