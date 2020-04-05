import React, { Component } from "react";
import { Route,Switch} from "react-router-dom";
import LoginForm from "./loginForm";
//import Home from "./Home";
import './App.css';
import Register from "./Register";
import RegisterInfo from "./RegisterInfo";
import TakePhoto from "./TakePhoto";
import TakeRegisterPhoto from "./TakeRegisterPhoto";
import Welcome from "./Welcome";
import VerifyEmail from "./VerifyEmail";
import Election from './Election/Election';
import Result from './Election/ElectionResult';
import CandidateDetail from './Candidate/CandidateDetail';
import Navbar from './Navbar';

class Home extends Component {
  render() {
    return (
      <div>
          <div>
          <Navbar/>
          <Switch>>
            <Route path="/Login" component={LoginForm} />
            {/* <Route exact path="/Home" component={Home} /> */} 
            <Route exact path="/Register" component={Register} />
            <Route exact path="/RegisterInfo" component={RegisterInfo} />
            <Route exact path="/TakePhoto" component={TakePhoto} />
            <Route exact path="/welcome" component={Welcome} />
            <Route exact path="/verifyemail" component={VerifyEmail} />
            <Route exact path="/takeregisterphoto" component={TakeRegisterPhoto} />
            <Route exact path="/election" component={Election}/>
            <Route exact path="/result" thcomponent={Result}/>
            <Route exact path="/candidateDetail" component={CandidateDetail}/>
            </Switch>
          </div>
       
      </div>
    );
  }
}
//Export The Main Component
export default Home;
