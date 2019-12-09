import React,{ Component } from 'react';

import './exit.css';

class ExitForm extends Component {
  render() {
    return (
        <form class="exit">
            <h1 align="center">EXIT TEST FORM</h1>
            Date: <input type="date" name="pickDate"/><br/><br/>
            Start time: <input type="text" name="Start"></input><br/><br/>
            End time: <input type="text" name="End"></input><br/><br/>
            License plate: <input type="string" name="enterPlate"/><br/><br/>
            <input type="submit" name="submit" value="Submit"/>
        </form>
    );
  }
}


export default ExitForm;
