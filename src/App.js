import './App.css';
import {Component} from 'react'
import {Auth, getUser} from './auth'
import { getUserFragments, getFragmentById } from './api';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080'

class App extends Component {
  state = {
    username: null,
    fragment: '',
    users: null
  };
  login() {
    Auth.federatedSignIn();
  }
  logout(){
    Auth.signOut();
  }
  componentDidMount(){
    //get fragment ID
   
    this.init()
  }
  init = async() => {
    let f_id = window.location.href.split('/')
    f_id = f_id[f_id.length-1]
    const user = await getUser()
    
    console.log(user)
    console.log("f_id: " + f_id)
    if (user !== null){
      this.setState({username: user.username})
      this.setState({users: user})
    }
    if (f_id === "fragments" || f_id === ''){
      console.log("All Fragments")
      getUserFragments(user)
    }else{
      console.log("By ID")
      getFragmentById(user, f_id)
    }
  }
  
  submit = async()=>{
    const res = await fetch(`${API_URL}/v1/fragments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        ...this.state.users.authorizationHeaders()
      },
      body: this.state.fragment
    })
  }

  render (){
    return (
      <div className="App">
        <h1>Fragments-UI</h1>
        <p hidden={this.state.username === null?true:false}>Hi {this.state.username}</p>
        <br></br>
        <label>Enter Fragment data</label>
        <br></br>
        <input type="text" onChange={(e)=>this.setState({fragment: e.target.value})}></input>
        <br></br>
        <button onClick={() => this.submit()}>Submit</button>
        <br></br>
        <button onClick={this.login} disabled={this.state.username === null?false:true}>Log in</button>
        <button onClick={this.logout} disabled={this.state.username === null?true:false}>Log out</button>
      </div>
    );
  }
 
}

export default App;
