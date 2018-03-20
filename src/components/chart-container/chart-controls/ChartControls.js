import React, { Component } from "react";

import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./chart-controls.scss";

class ChartControls extends Component {
  changeChartType = e => {
    switch (e.target.value) {
      case "singlepolar":
        this.props.changeChartType(e.target.value);
        break;
      case "polar":
        this.props.changeChartType(e.target.value);
        break;
      case "bar":
        this.props.changeChartType(e.target.value);
        break;
      case "table":
        this.props.changeChartType(e.target.value);
        break;
      default:
        this.props.changeChartType("singlepolar");
        break;
    }
  };

  render() {
    return (
      <div className="control-wrapper">
        <div className="chart-control-buttons">
          <button className="btn" value="bar" onClick={this.changeChartType}>
            Bar chart
          </button>
          {/* <button className="btn" value="table" onClick={this.changeChartType}>
            Table chart
          </button> */}
          <button className="btn" value="polar" onClick={this.changeChartType}>
            Polar chart
          </button>
        </div>
      </div>
    );
  }
}

export default ChartControls;
