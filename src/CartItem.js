import React from 'react';

const CartItem = (props) => {

    // // As we used props we don't need the state here anymore. 
    // // we will use this state in Cart

    // // Constructor
    // // constructor() {
    // //     super();
    // //     this.state = {
    // //         price: 999,
    // //         title: "Mobile Phone",
    // //         qty: 1,
    // //         img: ""
    // //     }

    // // this.increaseQuantity = this.increaseQuantity.bind(this);
    // // or you can achieve this with, see the arraow function
    // // this.testing();
    // // }

    // // Function
    // increaseQuantity = () => {

    //     // arrow function will automaticaly bind CartItem with the instance of this class

    //     // this.state.qty += 1 // if u do so, instead of the quantity, the entire object will increase by one amd react is unaware of that
    //     // we have to tell React, hey increase the qty value by 1 and rerender it
    //     // to do this, react provides something called "setstate" which is present inside react.component

    //     // console.log("this", this.state); // use bind otherwise data will be lost

    //     // setState form 1
    //     // this.setState({
    //     //     qty: this.state.qty + 1
    //     // }, () => {
    //     //     console.log("this.state", this.state);
    //     // });

    //     // react will take this object and merge it with the state object.
    //     // it does SHALLOW MERGING. it will only update the state and won't touch other property
    //     // after setState React automatically rerender our component with the updated data

    //     // setState form 2
    //     this.setState((prevState) => {
    //         return {
    //             qty: prevState.qty + 1
    //         }
    //     }, () => {
    //         console.log("this.state", this.state);
    //     });
    //     // React calls this function and passes prevState in it
    //     // we have to return an object and we tell React that, we want to change this property on state
    //     // we use form 2  when we need to change data based on previous state
    //     // otherwise form 1 is good
    // }

    // decreaseQuantity = () => {

    //     // Destructuring again
    //     const { qty } = this.state;

    //     if (qty == 0) {
    //         return;
    //     }

    //     this.setState((prevState) => {
    //         return {
    //             qty: prevState.qty - 1
    //         }
    //     }, () => {
    //         // console.log("this.state", this.state);
    //     });

    //     // console.log(this); // async behaviour. UI changes but console yet to be updated
    //     // to overcome this u can pass another callback in the setState
    //     // here, call back will be executing when our state ends
    // }

    // // NOTE : our setState call is aasynchronous
    // // Being async we don't know when the call finishes

    // // Experiments :

    // // if you call form 1 thrice one after another the latest one will work
    // // This is Batching
    // // It means, in an event handler no matter how many types you call setState, React will merge these calls into single setState call, which is why our component is rendered only once

    // // if you call form 2 thrice, then qty will be increasing by one but React will render the component only once
    // // in this case React maintains a queue of setState and works according to that
    // // this is how React does batching

    // // Uptil here

    // // But but ..
    // // This is not true always
    // // when we use Ajax call or when we make Promises
    // // those cases React doesn't do batching for us and setState acts as a synchronous call
    // // React 17 may have resolved this synchronous issue

    // // testing() {
    // //     const promise = new Promise((resolve, reject) => {
    // //         setTimeout(() => {
    // //             resolve("done");
    // //         }, 3000);
    // //     })
    // //     promise.then(() => {
    // //         // Because hese setState acts like synchronous call
    // //         this.setState({ qty: this.state.qty + 10 });
    // //         this.setState({ qty: this.state.qty + 10 });
    // //         this.setState({ qty: this.state.qty + 10 });
    // //         console.log("state", this.state); // it supposed to give 31, but somehow it gives 11, I don't know whether it is for React 18 or not, who resolved the synchronous issue
    // //     });
    // // }




    console.log("this.props", props);
    // CartItem will get the Props in this.props property in its instance
    // so every instance of CartItem will have this props

    // Object Destructuring

    // const { price, title, qty } = this.state;

    // const { price, title, qty } = this.props;

    const { price, title, qty } = props.product;
    const { product, onIncreasedQuantity, onDecreasedQuantity, onDeleteProduct } = props;

    return (
        <div className="cart-item">

            {/* {this.props.jsx} */}

            <div className="left-block">
                <img style={styles.image} src={product.img} />
            </div>

            {/* {this.props.jsx} */}
            {/* upto u, where u wish to place it */}

            <div className="right-block">
                <div style={{ fontSize: 25 }}>{title}</div>
                <div style={{ color: '#77' }}>Rs {price}</div>
                <div style={{ color: '#77' }}>Qty : {qty}</div>
                <div className='cart-item-actions'>
                    {/* Buttons */}
                    <img
                        alt="increase"
                        className='action-icons'
                        src="https://cdn-icons-png.flaticon.com/512/992/992651.png"
                        onClick={() => onIncreasedQuantity(product)}
                    // the other way to do this is in constructor
                    // onClick={this.increaseQuantity.bind(this)}
                    />
                    <img
                        alt="decrease"
                        className='action-icons'
                        src="https://cdn-icons-png.flaticon.com/512/992/992683.png"
                        onClick={() => onDecreasedQuantity(product)}
                    />
                    <img
                        alt="delete"
                        className='action-icons'
                        src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
                        onClick={() => onDeleteProduct(product.id)}
                    />
                </div>
            </div>
        </div>
    );
}

const styles = {
    image: {
        height: 110,
        width: 110,
        borderRadius: 4,
        background: '#ccc'
    }
}

export default CartItem;

// we can pass prettymuch anything from parent to children using props

// we moved setState, from CartItem to cart

// Converted from Class compo to function compo

// removed all "this" as it is not a class compo anymore