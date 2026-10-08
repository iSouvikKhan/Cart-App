# Cart App

A shopping cart built with React and Cloud Firestore (Firebase). Products are stored in a Firestore `products` collection and the UI listens to it in real time, so changes made from one browser show up in every open session without a page refresh.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and was written as a learning exercise (the source contains many explanatory comments about props, state, `setState` and component lifecycle).

## Features

- Lists products from the Firestore `products` collection using a real-time `onSnapshot` listener
- Increase or decrease the quantity of an item (quantity does not go below 0); the change is written to Firestore
- Delete an item from the cart (removes the document from Firestore)
- "Add Product" button that adds a sample product (a washing machine) to the collection
- Navbar cart icon showing the total number of items (sum of quantities)
- Cart total (sum of quantity x price)
- "Loading Products..." message until the first snapshot arrives

## Tech Stack

- React 18 (Create React App / `react-scripts` 5)
- Firebase JavaScript SDK 9 (compat API) with Cloud Firestore

## Project Structure

```
Cart-App/
├── public/             # index.html, icons, manifest
├── src/
│   ├── index.js        # Firebase initialization and app entry point
│   ├── App.js          # State, Firestore listener and cart handlers
│   ├── Cart.js         # Renders the list of CartItem components
│   ├── CartItem.js     # Single product row with increase/decrease/delete actions
│   ├── Navbar.js       # Top bar with cart icon and item count
│   └── index.css       # Styles
├── Info/
│   └── Notes.txt       # Study notes (app flow, Firestore real-time sync, React lifecycle)
└── package.json
```

## Prerequisites

- Node.js and npm
- A Firebase project with Cloud Firestore enabled (if you want to use your own backend)

## Setup

```bash
git clone https://github.com/iSouvikKhan/Cart-App.git
cd Cart-App
npm install
```

### Firebase configuration

The Firebase configuration object is hard-coded in `src/index.js` (`firebaseConfig`). To use your own Firebase project, replace those values with the web app config from your Firebase console.

The app reads and writes a top-level Firestore collection named `products`. Each document is expected to have these fields:

| Field   | Type   | Description         |
|---------|--------|---------------------|
| `title` | string | Product name        |
| `price` | number | Unit price (shown as Rs) |
| `qty`   | number | Quantity in cart    |
| `img`   | string | Image URL           |

Your Firestore security rules must allow the app to read, update, add and delete documents in this collection.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes. You may also see any lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode. Note that the project currently contains no test files.

### `npm run build`

Builds the app for production to the `build` folder. It bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

Copies all the build configuration (webpack, Babel, ESLint, etc.) into the project so you have full control over it.

## Learn More

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)
- [Cloud Firestore documentation](https://firebase.google.com/docs/firestore)
