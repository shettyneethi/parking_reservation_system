import React from 'react';
import './table.css'

class Table extends React.Component {

  createTable = () => {
    let table = []

    // Outer loop to create parent
    for (let i = 0; i < 10; i++) {
      let children = []
      //Inner loop to create children
      for (let j = 0; j < 24; j++) {
        children.push(<td><input type="button" value="&#10003;" class="available"/></td>)
      }
      //Create the parent and add the children
    table.push(<tr>{i+1}{children}</tr>)
    }
    return table
  }


  render() {
    return(
        <div class="reservation">
            <h1 align="center">PICK DESIRED SLOT</h1>
            <table>
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
                {this.createTable()}
            </table>
        </div>
    )
  }

}

export default Table;