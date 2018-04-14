import React, { Component } from "react";

import Charts from "./charts/Charts";
import TableChart from "./table-chart/TableChart";
import ChartControls from "./chart-controls/ChartControls";

import "./chartcontainer.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

class ChartContainer extends Component {
  constructor(props) {
    super(props);
  //  this.setScenarioId = this.setScenarioId.bind(this);

    this.state = {
      chartType: "bar"
    };

    this.changeChartType = this.changeChartType.bind(this);
    this.RenderChart = this.RenderChart.bind(this);
  }

  // setScenarioId() {
  //   console.log(this.props.options);
  // }

  changeChartType(type) {
    this.setState({
      chartType: type
    });
  }

  RenderChart(chartType) {
    switch (chartType) {
      case "bar":
        return (
          <Charts
            values={this.props.valueData}
            options={this.props.options}
            scenarios={this.props.scenarios}
            regionalLevel={this.props.regionalLevel}
            region={this.props.region}
            isPolar={false}
            groupByScenariosLabel = {this.props.groupByScenariosLabel}
            groupByIndicatorsLabel = {this.props.groupByIndicatorsLabel}
            groupByTimeperiodsLabel = {this.props.groupByTimeperiodsLabel}
            columnTypeLabel = {this.props.columnTypeLabel}
            barTypeLabel = {this.props.barTypeLabel}
            valuesLabel = {this.props.valuesLabel}
            scenariosLabel = {this.props.scenariosLabel}
            indicatorsLabel = {this.props.indicatorsLabel}
            saveAsPNG = {this.props.saveAsPNG}
            saveAsSVG = {this.props.saveAsSVG}
            saveAsJPEG = {this.props.saveAsJPEG}
            print = {this.props.print}
            graphByYearLabel = {this.props.graphByYearLabel}
            graphByScenariosLabel = {this.props.graphByScenariosLabel}
            timePeriodsLabel = {this.props.timePeriodsLabel}
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
            groupByScenariosLabel = {this.props.groupByScenariosLabel}
            groupByIndicatorsLabel = {this.props.groupByIndicatorsLabel}
            groupByTimeperiodsLabel = {this.props.groupByTimeperiodsLabel}
            saveAsPNG = {this.props.saveAsPNG}
            saveAsCSV = {this.props.saveAsCSV}
            saveAsJPEG = {this.props.saveAsJPEG}
            print = {this.props.print}
            scenariosLabel = {this.props.scenariosLabel}
            indicatorsLabel = {this.props.indicatorsLabel}
            graphByYearLabel = {this.props.graphByYearLabel}
            graphByScenariosLabel = {this.props.graphByScenariosLabel}
            timePeriodsLabel = {this.props.timePeriodsLabel}
          />
        );
      case "polar":
      return (
        <Charts
          values={this.props.valueData}
          options={this.props.options}
          scenarios={this.props.scenarios}
          regionalLevel={this.props.regionalLevel}
          region={this.props.region}
          isPolar={true}
          groupByScenariosLabel = {this.props.groupByScenariosLabel}
          groupByIndicatorsLabel = {this.props.groupByIndicatorsLabel}
          groupByTimeperiodsLabel = {this.props.groupByTimeperiodsLabel}
          columnTypeLabel = {this.props.columnTypeLabel}
          barTypeLabel = {this.props.barTypeLabel}
          valuesLabel = {this.props.valuesLabel}
          scenariosLabel = {this.props.scenariosLabel}
          indicatorsLabel = {this.props.indicatorsLabel}
          saveAsPNG = {this.props.saveAsPNG}
          saveAsSVG = {this.props.saveAsSVG}
          saveAsJPEG = {this.props.saveAsJPEG}
          print = {this.props.print}
          graphByYearLabel = {this.props.graphByYearLabel}
          graphByScenariosLabel = {this.props.graphByScenariosLabel}
          timePeriodsLabel = {this.props.timePeriodsLabel}
        />
      );
      default:
        return <Charts />;
    }
  }

  render() {
    return (
      <div className="chart-container content-panel shadow-1">
        <div className="chart-content">
          {this.RenderChart(this.state.chartType)}
        </div>
        <div className="chart-controls">
          <ChartControls 
            changeChartType={this.changeChartType}
            barChartLabel = {this.props.barChartLabel}
            tableChartLabel = {this.props.tableChartLabel}
            polarChartLabel = {this.props.polarChartLabel}
            />
        </div>
      </div>
    );
  }
}

export default ChartContainer;
