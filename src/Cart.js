import React from 'react';

import CartItem from './CartItem';

const Cart = (props) => {


    // // Constructor
    // constructor() {
    //     super();
    //     this.state = {
    //         products: [
    //             {
    //                 price: 999,
    //                 title: "Watch",
    //                 qty: 1,
    //                 img: "",
    //                 id: 1
    //             },
    //             {
    //                 price: 999,
    //                 title: "Mobile Phone",
    //                 qty: 10,
    //                 img: "",
    //                 id: 2
    //             },
    //             {
    //                 price: 999,
    //                 title: "Laptop",
    //                 qty: 4,
    //                 img: "",
    //                 id: 3
    //             },
    //         ]
    //     }
    // }

    // handleIncreasedQuantity = (product) => {
    //     console.log("Hey please increase quantity of ", product);
    //     const { products } = this.state;
    //     const index = products.indexOf(product);
    //     products[index].qty += 1;

    //     this.setState({
    //         // products: products
    //         // benefit of having key value pair, same name
    //         products
    //     });
    // }

    // handleDecreasedQuantity = (product) => {

    //     console.log("Hey please decrease quantity of ", product);
    //     const { products } = this.state;
    //     const index = products.indexOf(product);

    //     if (products[index].qty == 0) {
    //         return;
    //     }

    //     products[index].qty -= 1;

    //     this.setState({
    //         products
    //     });
    // }

    // handleDeleteProduct = (id) => {
    //     const { products } = this.state;

    //     const items = products.filter((item) => item.id !== id);
    //     // it returns another array, which contain products whose id is not equal to the id is passed
    //     this.setState({
    //         products: items
    //     })
    // }



    // const arr = [1, 2, 3, 4];

    const { products } = props;

    return (
        <div className='cart'>

            {/* <CartItem />
            <CartItem />
            <CartItem /> */}

            {/*arr.map((item) => item * 2)*/} {/*2 4 6 8*/}

            {/* Props */}
            {/* <CartItem qty={1} price={99} title={"Watch"} img={""} /> */}

            {products.map((prod) => // we r looping over
                <CartItem
                    product={prod}
                    key={prod.id}
                    // func={() => console.log("dhsmfdsim")}
                    // isLoggedIn={false}
                    // jsx={<h1>test</h1>}
                    onIncreasedQuantity={props.onIncreasedQuantity}
                    onDecreasedQuantity={props.onDecreasedQuantity}
                    onDeleteProduct={props.onDeleteProduct}

                />
            )}

            {/* as we r rendering multiple CartItems, React doesn't know how to differentiate between CartItems */}

            {/* when we have many compoments and we make change to any one, We have to tell REACT which component it should change */}

            { /* to overcome this, we use key={} */}

        </div>
    );

}

export default Cart;

// Props : props r similar to arguments which we pass to functions
// we will pass props to the CartItem and CartItem will use for itself
// When Parent has to pass data to its children, they use props

// setState was present in CartItem, which was inaccessible from Cart

// the component in which state resides, that component can only modify the state