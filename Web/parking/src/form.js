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
                          <option name="5:00 AM">5:00 PM</option>
                        </select><br/><br/>
            Hours: <select name="pickEnd">
                    <option name="7:00 AM">7:00 PM</option>
                  </select><br/><br/>
            License plate: <input type="string" name="enterPlate"/><br/><br/>
            <input type="submit" name="submit" value="Submit"/>
        </form>
    );
  }
}


export default Form;
