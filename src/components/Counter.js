import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";

const Counter = ({ counter, inc, dec, rnd }) => {
  return (
    <div className="jumbotron">
      <h2 id="counter">{counter}</h2>
      <button onClick={inc} className="btn btn-info" id="inc">
        Increment
      </button>
      <button onClick={dec} className="btn btn-info" id="dec">
        Decrement
      </button>
      <button onClick={rnd} className="btn btn-warning" id="rnd">
        Random
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    counter: state
  };
};

// const mapDispatchToProps = dispatch => {
// return bindActionCreators(actions, dispatch);
// return {
//   inc,
//   dec,
//   rnd
// };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Counter);
export default connect(mapStateToProps, actions)(Counter);
