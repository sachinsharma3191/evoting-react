import React, { Component } from "react";
import axios from "axios";
import "./Register.css";
import "./takephoto.css";

class TakePhoto extends Component {
  async captureImage() {
    console.log("in capture image ");
    var data = { name: "harsh" };
    const response = await axios.get("http://localhost:5000/api/predict", data);

    console.log(" response.data" + response);

    console.log(" response.data" + JSON.stringify(response.data));
    //localStorage.setItem("data", JSON.stringify(response.data))
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="information">
            <div className="pitchline" id="pitch">
              <div id="Main">Online election perfection!</div>
              <div id="about">Our E-Voting solution is here for you.</div>
            </div>
            <div className="row registerimage">
              <div className="overlayingreg col-md-6">
                <div className="qoute">
                  <div className="h3" class="since-title">
                    {" "}
                    Help.Us.Help.You
                    <br></br>
                    Security & Trust
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="canvasphoto" id="canvas">
            <div>Photo:</div>
            <video
              className="videoclass"
              id="videoForImage"
              autoplay
              width="250px"
              height="200px"
            ></video>
            <div></div>
            <button className="rg cp" id="capture" onClick={this.captureImage}>
              Capture
            </button>
          </div>
        </div>
      </div>
    );
  }
}
//Export The Main Component
export default TakePhoto;
