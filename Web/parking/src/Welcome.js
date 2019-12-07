import React, { Component } from 'react';
import logo from './Park1.jpg';
import './welcome.css';


class Welcome extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Parking Reservation System</h2>
        </div>

        <div className = "reservation"> 
       
              <table id = "t01" >
              <tr>
                <th rowspan="2">LOT#</th>
                <th colspan="14" scope="colgroup">AM</th>
                <th colspan="10" scope="colgroup">PM</th>
              </tr>
              <tr>
                <th scope="col">5-5.30</th>
                <th scope="col">5.30-6</th>
                <th scope="col">6-6.30</th>
                <th scope="col">6.30-7</th>
                <th scope="col">7-7.30</th>
                <th scope="col">7.30-8</th>
                <th scope="col">8-8.30</th>
                <th scope="col">8.30-9</th>
                <th scope="col">9-9.30</th>
                <th scope="col">9.30-10</th>
                <th scope="col">10-10.30</th>
                <th scope="col">10.30-11</th>
                <th scope="col">11-11.30</th>
                <th scope="col">11.30-12</th>
                <th scope="col">12-12.30</th>
                <th scope="col">12.30-1</th>
                <th scope="col">1-1.30</th>
                <th scope="col">1.30-2</th>
                <th scope="col">2-2.30</th>
                <th scope="col">2.30-3</th>
                <th scope="col">3-3.30</th>
                <th scope="col">3.30-4</th>
                <th scope="col">4-4.30</th>
                <th scope="col">4.30-5</th>
                </tr>

                <tr>
                <th scope="row">1</th>
                <td >0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
                <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
                <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
              </tr>
     
              <tr>
                <th scope="row">2</th>
                <td >0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
                <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
                <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
              </tr>

              <tr>
                <th scope="row">3</th>
                <td >0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
                <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
                <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td >0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
                <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
                <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td >0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
                <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
                <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
              </tr>

              <tr>
                <th scope="row">6</th>
                <td >0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
                <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
                <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
              </tr>

              <tr>
                <th scope="row">7</th>
                <td >0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
                <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
                <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
              </tr>
              <tr>
                <th scope="row">8</th>
                <td >0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
                <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
                <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
              </tr>

              <tr>
                <th scope="row">9</th>
                <td >0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
                <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
                <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
              </tr>
              <tr>
                <th scope="row">10</th>
                <td >0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
                <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
                <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
              </tr>

            </table>

        </div>
        
      </div>
    );
  }
}

export default Welcome