import React from 'react';
import './table.css'

class Table extends React.Component {
  constructor(){
    super();

    this.state = {
        green: true,
        class1: "available",
        class : "available",
        start_time : "",
        end_time :"",
        message : ""
    }

  }
  handleClick1 = () => {
  if(this.state.class1 == "available"){
    this.setState({
        class1: "selected",
        start_time : "5:00 AM"
      });
      }else{
      this.setState({
        class1: "available"
      });
      }
  
  }
  handleSubmit= () => {
  this.setState({
        class1: "booked",
        class : "booked",
        message : "Successfully booked lot for the given license plate for given time!!"
      });
  
  }
  handleClick= () => {
  if(this.state.class == "available"){
    this.setState({
        class: "selected",
        end_time : " 8:00 AM"
      });
      }else{
      this.setState({
        class: "available"
      });
      }
  
  }
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



  

  changeColor(){
      this.setState({green: !this.state.green})
  }

  render() {
    let btn_class = this.state.green ? "selected" : "available";

    return(
    <div>
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
                  <td><button type="button" className={this.state.class1} onClick={this.handleClick1}>&#x2713;</button></td>
                  <td><button type="button" className={this.state.class} onClick={this.handleClick}>&#x2713;</button></td>
                  <td><button type="button" className={this.state.class} onClick={this.handleClick}>&#x2713;</button></td>
                  <td><button type="button" className={this.state.class} onClick={this.handleClick}>&#x2713;</button></td>
                  <td><button type="button" className={this.state.class} onClick={this.handleClick}>&#x2713;</button></td>
                  <td><button type="button" className={this.state.class} onClick={this.handleClick}>&#x2713;</button></td>
                  <td><button type="button" className="booked">x</button></td>
                  <td><button type="button" className="booked">x</button></td>
                  <td><button type="button" className="booked">x</button></td>
                  <td><button type="button" className="booked">x</button></td>
                  <td><button type="button" className="booked">x</button></td>
                  <td><button type="button" className="available">&#x2713;</button></td>
                  <td><button type="button" className="available">&#x2713;</button></td>
                  <td><button type="button" className="available">&#x2713;</button></td>
                  <td><button type="button" className="booked">x</button></td>
                  <td><button type="button" className="booked">x</button></td>
                  <td><button type="button" className="booked">x</button></td>
                  <td><button type="button" className="available">&#x2713;</button></td>
                  <td><button type="button" className="available">&#x2713;</button></td>
                  <td><button type="button" className="available">&#x2713;</button></td>
                  <td><button type="button" className="booked">x</button></td>
                  <td><button type="button" className="booked">x</button></td>
                  <td><button type="button" className="booked">x</button></td>
                  <td><button type="button" className="booked">x</button></td>

                </tr>
                {this.createTable()}
            </table>
        </div>
        
        <div id="booking-form">

         <form class="resform">
         <h3 align="center" style={{ color: 'red' }}>{this.state.message}</h3>
            <h1 align="center">RESERVATION FORM</h1>
            <h4 align="center">Amount per hour: $1.00</h4>
            Date: <input type="text" placeholder="12/09/2019" name="pickDate"></input><br/><br/>
            Start time: <select name="pickTime">
                          <option name="5:00 AM">{this.state.start_time}</option>
                        </select><br/><br/>
            end time: <select name="pickEnd">
                    <option name="7:00 AM">{this.state.end_time}</option>
                  </select><br/><br/>
            License plate: <input type="string" name="enterPlate"/><br/><br/>
           <button type="button" onClick={this.handleSubmit}>Submit</button>
        </form>
        
        </div>
        </div>
    )
  }

}

export default Table;