import React from 'react'
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
              <h3>Market Data Center</h3>
              <span>This application helps to collect market data, Stores, Goods, Clients, Services</span>
          </div><br/>
          <ShoppingList/>
        </div>
      </Provider>
    );
}

export default App;
