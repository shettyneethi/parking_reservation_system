import React, { Component } from 'react';
import Header from './header.js';
import Table from './table.jsx';
import Form from './form.js';
import EntryForm from './entry.jsx';
import ExitForm from './exit.jsx'

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
        <div id="entry-form">
          <EntryForm />
        </div>
        <div id="exit-form">
          <ExitForm />
        </div>
      </div>
    );
  }
}


export default App;
