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
      case "column":
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
      {/* <div className="btn-group"> */}
        <div className="chart-control-buttons btn-group">
          <button className="btn chart-control" value="bar" onClick={this.changeChartType}>
           {this.props.barChartLabel}
          </button>
          <button className="btn chart-control" value="column" onClick={this.changeChartType}>
            {this.props.columnChartLabel}
          </button>
          <button className="btn chart-control" value="table" onClick={this.changeChartType}>
            {this.props.tableChartLabel}
          </button>
          <button className="btn chart-control" value="polar" onClick={this.changeChartType}>
            {this.props.polarChartLabel}
          </button>
        </div>
      </div>
      // </div>
    );
  }
}

export default ChartControls;
