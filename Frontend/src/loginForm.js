import React from "react";
import SubmitButton from "./submitButton";
import UserStorage from "./stores/UserStorage";
import { Redirect } from "react-router-dom";
import "./App.css";
import InputFields from "./inputFields";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      buttonDisabled: false,
    };
  }

  setInputValue(property, val) {
    val = val.trim();
    if (val.length > 12) {
      return;
    }
    this.setState({
      [property]: val,
    });
  }

  async doLogin() {
    if (!this.state.username) return;
    if (!this.state.password) return;
    this.setState({
      buttonDisabled: true,
    });

    try {
      console.log(this.state.username);
      let res = await fetch("http://localhost:3002/login", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      });

      let result = await res.json();
      if (result && result.success) {
        // let redirectVar = null;
        UserStorage.isLoggedIn = true;
        UserStorage.username = result.username;
        this.props.history.push("/welcome");
        console.log("username" + result.username);
        // redirectVar = <Redirect to="/welcome" />
      } else if (result && result.success === false) {
      }
    } catch (e) {}
  }

  render() {
    let redirectVar = null;
    if (UserStorage.username) {
      redirectVar = <Redirect to="/welcome" />;
    }
    return (
      <div className="container">
        {/* {redirectVar} */}
        {/* <div className="body"> */}
        <div className="row">
          <div className="pitchline" id="pitch">
            <div id="Main">Online election perfection!</div>
            <div id="about">Our E-Voting solution is here for you.</div>
          </div>
        </div>

        <div className="row maps">
          <div className="overlaying col-md-6">
            <div className="bckimage " id="bck">
              {" "}
            </div>
            <div className="qoute">
              <div className="h3" className="since-title">
                {" "}
                HelpingPeopleConnect
                {/* <span></span> */}
                <br></br>
                Since 2020
                <br></br>
                Security & Trust
              </div>
            </div>
          </div>

          <div className="loginForm logindetails col-md-6">
            Login
            <InputFields
              type="text"
              placeholder="Username"
              value={this.state.username ? this.state.username : ""}
              onChange={(val) => this.setInputValue("username", val)}
            />
            <InputFields
              type="text"
              placeholder="Password"
              value={this.state.password ? this.state.password : ""}
              onChange={(val) => this.setInputValue("password", val)}
            />
            <SubmitButton
              text="Login"
              disabled={this.state.buttonDisabled}
              onClick={() => this.doLogin()}
            />
          </div>{
              redirectVar
          }
        </div>

        <div className="row">
          <div className="reviews">
            <div className="reviewtitle">
              <div className=" h3 titlemessage">
                {" "}
                Straight from the horses mouth!{" "}
              </div>
              <span></span>
              <p>
                ElectronicBallot has been rated 4.8 out of 5 stars with 430000+
                reviews
              </p>
            </div>
            <div className="col-md-4 customer">
              <div className="photoandstar">
                <div className="custname">Vrushali</div>
                <div className="custphoto1"></div>
                <div className="stars">
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                </div>
              </div>
              <div className="review">
                When nothing else worked, ElectronicBallot came to the rescue.
              </div>
            </div>
            <div className="col-md-4 customer">
              <div className="photoandstar">
                <div className="custname">Nistha</div>
                <div className="custphoto2"></div>
                <div className="stars">
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                </div>
              </div>
              <div className="review">Easy and hassle free.</div>
            </div>
            <div className="col-md-4 customer">
              <div className="photoandstar">
                <div className="custname">Aditya</div>
                <div className="custphoto3"></div>
                <div className="stars">
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                </div>
              </div>
              <div className="review">
                ElectronicBallot has reduced the voting time by 90%.
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    );
  }
}

export default LoginForm;
