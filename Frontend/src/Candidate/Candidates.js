import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import _ from "underscore";
import Spinner from "../UI/Spinner/Spinner";
import Candidate from "./Candidate";

const base64Flag = "data:image/jpeg;base64,";

class Candidates extends Component {
  constructor(props) {
    super(props);

    this.state = {
      candidates: [],
      error: null,
      loading: true,
    };
    this.showDetails = this.showDetails.bind(this);
    this.vote = this.vote.bind(this);
  }

  componentDidMount = async () => {
    axios
      .get("http://localhost:3002/candidate/all")
      .then((res) => {
        this.setState({ candidates: res.data.data, loading: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: error, loading: false });
      });
  };

  arrayBufferToBase64 = (buffer) => {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  getCandidateImage = async (candidate) => {
    let first_name = candidate.split("_")[0];

    let candidates = [...this.state.candidates];

    let imageStr = null;

    await axios
      .get("http://localhost:3002/candidate/image/" + candidate)
      .then((res) => {
        imageStr = this.arrayBufferToBase64(res.data.image.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
    for (let candidate of candidates) {
      if (candidate.first_name === first_name) {
        candidate["image"] = base64Flag + imageStr;
      }
    }
    this.setState({ candidates });
  };

  showDetails = (id) => {
    if (_.isNumber(id)) {
      const candidate = this.state.candidates.filter(
        (candidate) => candidate.id === id
      );
      this.props.history.push({
        pathname: "/candidateDetail",
        state: { candidateDetails: candidate },
      });
    }
  };

  vote(id) {

  }

  render() {
    const { loading, candidates } = this.state;

    let ui = null;
    if (loading && _.isEmpty(candidates)) {
      ui = <Spinner />;
    }
    if (!_.isEmpty(candidates)) {
      ui = candidates.map((candidate) => {
        if (_.isEmpty(candidate["image"])) {
          const fullName = candidate.first_name + "_" + candidate.last_name;
          this.getCandidateImage(fullName);
        }
        return (
          <Candidate
            showDetails={this.showDetails}
            key={candidate.id}
            candidate={candidate}
          />
        );
      });
    }
    return <div className="row">{ui}</div>;
  }
}

export default withRouter(Candidates);
