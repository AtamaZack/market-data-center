import React, { Component } from 'react'
import AppNavbar from './components/AppNavbar'
import ShoppingList from './components/ShoppingList'

import { Provider } from 'react-redux'
import store from './store'


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App () {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar/>
          <div className="container">
              <h3>Welcome to the MERN Stack App</h3>
              <span>This is a simple app that covers the MERN Stack technologies</span>
          </div><br/>
          <ShoppingList/>
        </div>
      </Provider>
    );
}

export default App;
