import React, { Component } from 'react';
import Header from './header.js';
import Table from './table.js';
import Form from './form.js';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <div id="app">
            <Header />
        </div>    
        <div id="table">
          <Table />
        </div>
        <br></br>
        <div id="booking-form">
          <Form />
        </div>
      </div>
    );
  }
}


export default App;