import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router-dom";
import _ from "underscore";
import Spinner from "../UI/Spinner/Spinner";
import Candidate from "./Candidate";
import * as actions from '../redux/actions/index';

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
    this.props.onFetchCandidates();
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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.candidates !== nextProps.candidates) {
      return {
        candidates: nextProps.candidates
      };
    }
    return null;
  }

  arrayBufferToBase64 = (buffer) => {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };


  showDetails = (id) => {
    if (_.isNumber(id)) {
      const candidate = this.state.candidates.filter(
        (candidate) => candidate.id === id
      );
      this.props.history.push({
        pathname: "/CandidateDetail",
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

const mapStateToProps = (state) => {
  return {
    loading: state.candidate.loading,
    error: state.candidate.error,
    candidates: state.candidate.candidates
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchCandidates: () => dispatch(actions.fetchCandidate())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Candidates));

