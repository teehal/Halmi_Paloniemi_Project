import React, { Component } from "react";

import BarChart from "./barchart/BarChart";
import TableChart from "./table-chart/TableChart";
import PolarChart from "./polarchart/PolarChart";
import ChartControls from "./chart-controls/ChartControls";

import "./chartcontainer.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

class ChartContainer extends Component {
  constructor(props) {
    super(props);
    this.setScenarioId = this.setScenarioId.bind(this);

    this.state = {
      chartType: "bar"
    };

    this.changeChartType = this.changeChartType.bind(this);
    this.RenderChart = this.RenderChart.bind(this);
  }

  setScenarioId() {
    console.log(this.props.options);
  }

  changeChartType(type) {
    this.setState({
      chartType: type
    });
  }

  RenderChart(chartType) {
    switch (chartType) {
      case "bar":
        return (
          <BarChart
            values={this.props.valueData}
            options={this.props.options}
            scenarios={this.props.scenarios}
            regionalLevel={this.props.regionalLevel}
            region={this.props.region}
          />
        );
      case "table":
        return (
          <TableChart
            values={this.props.valueData}
            options={this.props.options}
            scenarios={this.props.scenarios}
            regionalLevel={this.props.regionalLevel}
            region={this.props.region}
          />
        );
      case "polar":
      return (
        <PolarChart
          values={this.props.valueData}
          options={this.props.options}
          scenarios={this.props.scenarios}
          regionalLevel={this.props.regionalLevel}
          region={this.props.region}
        />
      );
      default:
        return <BarChart />;
    }
  }

  render() {
    return (
      <div className="chart-container content-panel shadow-1">
        <div className="chart-content">
          {this.RenderChart(this.state.chartType)}
        </div>
        <div className="chart-controls">
          <ChartControls changeChartType={this.changeChartType} />
        </div>
      </div>
    );
  }
}

export default ChartContainer;
