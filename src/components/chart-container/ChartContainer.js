import React, { Component } from "react";

import Charts from "./charts/Charts";
import TableChart from "./table-chart/TableChart";
import ChartControls from "./chart-controls/ChartControls";

import "./chartcontainer.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

class ChartContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartType: "column"
    };

    this.changeChartType = this.changeChartType.bind(this);
    this.RenderChart = this.RenderChart.bind(this);
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
          <Charts
            barTypeLabel = {this.props.barTypeLabel}
            chartType = {chartType}
            columnTypeLabel = {this.props.columnTypeLabel}
            graphByScenariosLabel = {this.props.graphByScenariosLabel}
            graphByYearLabel = {this.props.graphByYearLabel}
            groupByIndicatorsLabel = {this.props.groupByIndicatorsLabel}
            groupByScenariosLabel = {this.props.groupByScenariosLabel}
            groupByTimeperiodsLabel = {this.props.groupByTimeperiodsLabel}
            indicatorsLabel = {this.props.indicatorsLabel}
            isPolar={false}
            options={this.props.options}
            print = {this.props.print}
            regionalLevel={this.props.regionalLevel}
            region={this.props.region}
            saveAsJPEG = {this.props.saveAsJPEG}
            saveAsPNG = {this.props.saveAsPNG}
            saveAsSVG = {this.props.saveAsSVG}
            scenariosLabel = {this.props.scenariosLabel}
            scenarios={this.props.scenarios}
            timePeriodsLabel = {this.props.timePeriodsLabel}
            valuesLabel = {this.props.valuesLabel}
            values={this.props.valueData}
          />
        );
      case "column":
        return (
          <Charts
            barTypeLabel = {this.props.barTypeLabel}
            chartType = {chartType}
            columnTypeLabel = {this.props.columnTypeLabel}
            columnChartLabel = {this.props.columnChartLabel}
            graphByScenariosLabel = {this.props.graphByScenariosLabel}
            graphByYearLabel = {this.props.graphByYearLabel}
            groupByIndicatorsLabel = {this.props.groupByIndicatorsLabel}
            groupByScenariosLabel = {this.props.groupByScenariosLabel}
            groupByTimeperiodsLabel = {this.props.groupByTimeperiodsLabel}
            indicatorsLabel = {this.props.indicatorsLabel}
            isPolar={false}
            options={this.props.options}
            print = {this.props.print}
            regionalLevel={this.props.regionalLevel}
            region={this.props.region}
            saveAsJPEG = {this.props.saveAsJPEG}
            saveAsPNG = {this.props.saveAsPNG}
            saveAsSVG = {this.props.saveAsSVG}
            scenariosLabel = {this.props.scenariosLabel}
            scenarios={this.props.scenarios}
            timePeriodsLabel = {this.props.timePeriodsLabel}
            valuesLabel = {this.props.valuesLabel}
            values={this.props.valueData}
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
          barTypeLabel = {this.props.barTypeLabel}
          chartType = "bar"
          columnTypeLabel = {this.props.columnTypeLabel}
          graphByScenariosLabel = {this.props.graphByScenariosLabel}
          graphByYearLabel = {this.props.graphByYearLabel}
          groupByIndicatorsLabel = {this.props.groupByIndicatorsLabel}
          groupByScenariosLabel = {this.props.groupByScenariosLabel}
          groupByTimeperiodsLabel = {this.props.groupByTimeperiodsLabel}
          indicatorsLabel = {this.props.indicatorsLabel}
          isPolar={true}
          options={this.props.options}
          print = {this.props.print}
          regionalLevel={this.props.regionalLevel}
          region={this.props.region}
          saveAsJPEG = {this.props.saveAsJPEG}
          saveAsPNG = {this.props.saveAsPNG}
          saveAsSVG = {this.props.saveAsSVG}
          scenariosLabel = {this.props.scenariosLabel}
          scenarios={this.props.scenarios}
          timePeriodsLabel = {this.props.timePeriodsLabel}
          valuesLabel = {this.props.valuesLabel}
          values={this.props.valueData}
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
            barChartLabel = {this.props.barChartLabel}
            changeChartType={this.changeChartType}
            columnChartLabel = {this.props.columnChartLabel}
            polarChartLabel = {this.props.polarChartLabel}
            tableChartLabel = {this.props.tableChartLabel}
          />
        </div>
      </div>
    );
  }
}

export default ChartContainer;
