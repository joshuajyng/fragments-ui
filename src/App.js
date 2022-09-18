import './App.css';
import {Component} from 'react'
import {Auth, getUser} from './auth'
import { getUserFragments } from './api';

class App extends Component {
  state = {
    username: null
  };
  login() {
    Auth.federatedSignIn();
  }
  logout(){
    Auth.signOut();
  }
  componentDidMount(){
    this.init()
  }
  init = async() => {
    const user = await getUser()
    console.log(user)
    if (user !== null){
      getUserFragments(user)
      this.setState({username: user.username})
    }
  }
  render (){
    return (
      <div className="App">
        <h1>Fragments-UI</h1>
        <p hidden={this.state.username === null?true:false}>Hi {this.state.username}</p>
        <button onClick={this.login}>Log in</button>
        <button onClick={this.logout} disabled={this.state.username === null?true:false}>Log out</button>
      </div>
    );
  }
 
}

export default App;
