import React from 'react';
import './table.css'

class Table extends React.Component {

  createTable = () => {
    let table = []
    let response = {1:{5.5:6,7:7.5},
                    2:{11.5:12},
                    3:{14:14.5},
                    4:{13:13.5},
                    5:{6:6.5},
                    6:{9:9.5},
                    7:{10:10.5},
                    8:{8:8.5},
                    9:{12:12.5},
                    10:{5:5.5}
                  }

    for (let i = 0; i < 10; i++) {
      if(i===0){
        continue;
      }
      let children = []
      let lot_num = i+1;
      for (let j = 5; j < 17; j+=0.5) {
        for(var key in response){
          if(key == lot_num){
            var val = response[key]
            for(var v in val){
              if(v == j){
                children.push(<td><button type="button" className="booked" disabled>x</button></td>)
                break;
              }
              else{
                children.push(<td><button type="button" className="available">&#x2713;</button></td>)
                break;
              }
            }
          }
        }
      }
      table.push(<tr>{i+1}{children}</tr>)
    }

  return table
  }

  constructor(){
    super();

    this.state = {
        green: true,
        status: "available"
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    if(this.state.status == "available"){
      console.log("entered toggle yellow")
      this.setState(state => ({
        status: "selected"
      }));
    }else{
      console.log("entered toggle green")
      this.setState(state => ({
        status: "available"
      }));
    }
    
  }

  changeColor(){
      this.setState({green: !this.state.green})
  }

  render() {
    let btn_class = this.state.green ? "selected" : "available";

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
                <tr>
                  <td>1</td>
                  <td><button type="button" className={this.state.status} onclick={this.handleClick}>&#x2713;</button></td>
                  <td><button type="button" className="available">&#x2713;</button></td>
                  <td><button type="button" className="available">&#x2713;</button></td>
                  <td><button type="button" className="available">&#x2713;</button></td>
                  <td><button type="button" className="available">&#x2713;</button></td>
                  <td><button type="button" className="available">&#x2713;</button></td>
                  <td><button type="button" className="available">&#x2713;</button></td>
                  <td><button type="button" className="available">&#x2713;</button></td>
                  <td><button type="button" className="available">&#x2713;</button></td>
                  <td><button type="button" className="available">&#x2713;</button></td>
                  <td><button type="button" className="available">&#x2713;</button></td>
                  <td><button type="button" className="available">&#x2713;</button></td>
                  <td><button type="button" className="available">&#x2713;</button></td>
                  <td><button type="button" className="available">&#x2713;</button></td>
                  <td><button type="button" className="available">&#x2713;</button></td>
                  <td><button type="button" className="available">&#x2713;</button></td>
                  <td><button type="button" className="available">&#x2713;</button></td>
                  <td><button type="button" className="available">&#x2713;</button></td>
                  <td><button type="button" className="available">&#x2713;</button></td>
                  <td><button type="button" className="available">&#x2713;</button></td>
                  <td><button type="button" className="available">&#x2713;</button></td>
                  <td><button type="button" className="available">&#x2713;</button></td>
                  <td><button type="button" className="available">&#x2713;</button></td>
                  <td><button type="button" className="available">&#x2713;</button></td>
                </tr>
                {this.createTable()}
            </table>
        </div>
    )
  }

}

export default Table;