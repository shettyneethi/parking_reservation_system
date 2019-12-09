import React,{ Component } from 'react';

import './entry.css';

class EntryForm extends Component {
     constructor(){
    super();

    this.state = {
        time :"",
        message : ""
    }
}
 handleChange = (e) => {
        this.setState({
            time: e.target.value
        })
        console.log("here")
    }
     handleSubmit = (e) => {
        if(this.state.time == "5:00 AM"){
             this.setState({
            message: "Booking found, You can park now!!!"
        })
        }else{
            this.setState({
            message: "No Booking found for this licence plate for this time."
        })
        }
        
        console.log("here")
    }
  render() {


    return (
        <form class="entry">
            
            <h1 align="center">REGISTER ENTRY</h1>
            <label>Date:</label> <input type="date" name="pickDate"/><br></br><br></br>
            <label>Time:</label> <input name='time' value={this.state.time} onChange={e => this.handleChange(e)}/><br></br><br></br>
            Upload image: <input type="file" name="pic" accept="image/*"></input><br></br><br></br>
            <button type="button" onClick={this.handleSubmit}>Submit</button><br></br><br></br>
            <h3 align="center" style={{ color: 'red' }}>{this.state.message} </h3>
        </form>
    );
  }
}


export default EntryForm;
