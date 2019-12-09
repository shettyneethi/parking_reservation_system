import React,{ Component } from 'react';

import './exit.css';

class ExitForm extends Component {
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
        if(this.state.time == "8:00 AM"){
             this.setState({
            message: "fine due = 0"
        })
        }else{
            this.setState({
            message: "fine due = 40"
        })
        }
        
        console.log("here")
    }
  render() {
    return (
         <form class="exit">
            
            <h1 align="center">REGISTER EXIT</h1>
            <label>Date:</label> <input type="date" name="pickDate"/><br></br><br></br>
            <label>Time:</label> <input name='time' value={this.state.time} onChange={e => this.handleChange(e)}/><br></br><br></br>
            Upload image: <input type="file" name="pic" accept="image/*"></input><br></br><br></br>
            <button type="button" onClick={this.handleSubmit}>Submit</button>
            <h3 align="center" style={{ color: 'red' }}>{this.state.message} </h3>
        </form>
    );
  }
}


export default ExitForm;
