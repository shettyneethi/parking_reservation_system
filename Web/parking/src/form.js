import React,{ Component } from 'react';

import './form.css';

class Form extends Component {
  render() {
    return (
        <form class="resform">
            <h1 align="center">RESERVATION FORM</h1>
            <h4 align="center">Amount per hour: $1.00</h4>
            Date: <input type="date" name="pickDate"/><br/><br/>
            Start time: <select name="pickTime">
                    <option name="1:30 PM">1:30 PM</option>
                    <option name="2:30 PM">2:30 PM</option>
                    <option name="3:30 PM">3:30 PM</option>
                    <option name="4:30 PM">4:30 PM</option>
                    <option name="5:30 PM">5:30 PM</option>
                </select><br/><br/>
            Hours: <input type="float" name="enterHours"/><br/><br/>
            License plate: <input type="string" name="enterPlate"/><br/><br/>
            <input type="submit" name="submit" value="Submit"/>
        </form>
    );
  }
}


export default Form;
