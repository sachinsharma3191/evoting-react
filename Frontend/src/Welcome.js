import React, { Component } from "react";
import SubmitButton from "./submitButton";
import UserStorage from "./stores/UserStorage";
import "./App.css";

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      buttonDisabled: false,
    };
  }

  doLogout() {
    UserStorage.username = "";
    this.props.history.push("/Login");
  }
  render() {
    if (UserStorage.username !== null) {
      console.log("username " + UserStorage.username);
    }
    return (
      <div className="container">
        <div className="nav-item" className="nav-link active" id="hom">
          Welcome {UserStorage.username}
        </div>
        <SubmitButton
          text={"Log Out"}
          disabled={false}
          onClick={() => this.doLogout()}
        />
      </div>
    );
  }
}
//Export The Main Component
export default Welcome;
