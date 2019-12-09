import React,{ Component } from 'react';

import './entry.css';

class EntryForm extends Component {
  render() {
    return (
        <form class="entry">
            <h1 align="center">ENTRY TEST FORM</h1>
            Date: <input type="date" name="pickDate"/><br/><br/>
            Start time: <input type="text" name="Start"></input><br/><br/>
            End time: <input type="text" name="End"></input><br/><br/>
            License plate: <input type="string" name="enterPlate"/><br/><br/>
            <input type="submit" name="submit" value="Submit"/>
        </form>
    );
  }
}


export default EntryForm;
