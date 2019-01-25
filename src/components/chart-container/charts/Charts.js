import React, { Component } from "react";

import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./charts.css";
import ReactHighcharts from "react-highcharts";
import {dataForGraphs, exporting, generateConfiguration, organizeData} from '../utils/Utils';
require("highcharts-more")(ReactHighcharts.Highcharts);
require("highcharts-exporting")(ReactHighcharts.Highcharts);

class Charts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartType: props.chartType,
      chartTypeLabel: props.barTypeLabel,
      groupBy: "indicator",
      groupByLabel: props.groupByScenariosLabel,
      groupByYearOrIndicator: props.groupByTimeperiodsLabel,
      graphByYearOrScenarioLabel: props.graphByScenariosLabel,
      pointWidth: 15,
      timePeriodsInGraphs: true,
    };

    this.dataForGraphs = dataForGraphs;
    this.exporting = exporting;
    this.generateConfiguration = generateConfiguration;
    this.myConfig = [];
    this.toggleChartType = this.toggleChartType.bind(this);
    this.toggleGroupBy = this.toggleGroupBy.bind(this);
    this.toggleScenarioGraphs = this.toggleScenarioGraphs.bind(this);
    this.toggleGroupByYearOrIndicator = this.toggleGroupByYearOrIndicator.bind(this);
    this.organizeData = organizeData;
  }

  componentWillReceiveProps(nextProp) {
    if (this.state.timePeriodsInGraphs) {
      this.setState({
        graphByYearOrScenarioLabel: nextProp.graphByScenariosLabel,
        groupByYearOrIndicator: nextProp.groupByTimeperiodsLabel
      });
    } else {
      this.setState({
        graphByYearOrScenarioLabel: nextProp.graphByYearLabel,
        groupByYearOrIndicator: nextProp.groupByIndicatorsLabel
      });
    }

    if (this.state.chartType === "column") {
      this.setState({
        chartTypeLabel: nextProp.barTypeLabel
      });
    } else {
      this.setState({
         chartTypeLabel: nextProp.columnTypeLabel
      });
    }

    if (this.state.groupBy === "scenario") {
      this.setState({
        groupByLabel: nextProp.groupByIndicatorsLabel
      });
    } else {
      this.setState({
        groupByLabel: nextProp.groupByScenariosLabel
      });
    }

    if (this.state.chartType !== nextProp.chartType)
      this.setState({
        chartType: nextProp.chartType
      });
  }

  toggleChartType() {
    if (this.state.chartType === "column") {
      this.setState({
        chartType: "bar",
        chartTypeLabel: this.props.columnTypeLabel
      });
    } else {
      this.setState({
        chartType: "column",
        chartTypeLabel: this.props.barTypeLabel
    });
  }
  }

  toggleGroupBy() {
    if (this.state.groupBy === "indicator") {
      this.setState({
        groupBy: "scenario",
        groupByLabel: this.props.groupByIndicatorsLabel
      });
    } else {
      this.setState({
        groupBy: "indicator",
        groupByLabel: this.props.groupByScenariosLabel
      });
    }
  }

  toggleGroupByYearOrIndicator() {
    let newGrouping = this.state.groupBy === "indicator" ? 
      "timePeriod" : "indicator";
    let newLabel = newGrouping === "indicator" ? this.props.groupByTimeperiodsLabel :
      this.props.groupByIndicatorsLabel;
 
    this.setState({
      groupBy: newGrouping,
      groupByYearOrIndicator: newLabel
    });
  }

  toggleScenarioGraphs() {
    let isItTimePeriodsInGraphs = this.state.timePeriodsInGraphs;
    let graphByYearOrScenarioLabel = isItTimePeriodsInGraphs ? this.props.graphByYearLabel: this.props.graphByScenariosLabel;
    let newGroupBy = this.state.groupBy === "scenario" ? "indicator" : 
      (!isItTimePeriodsInGraphs ? "scenario" : this.state.groupBy);

    this.setState({
      timePeriodsInGraphs: !isItTimePeriodsInGraphs,
      graphByYearOrScenarioLabel: graphByYearOrScenarioLabel,
      groupBy: newGroupBy
    });
  }

  render() {
    const values = this.props.values;
    const options = this.props.options;

    if (values.length > 0 && options.length > 0) {
      let timePeriod = options.filter(function(e) {
        return e.dataType === "timePeriod";
      });

      let scenariosSelectedList = options.filter(function(e) {
        return e.dataType === "scenario";
      });

      let indicatorsSelectedList = options.filter(function(e) {
        return e.dataType === "indicator";
      });

      let validData = this.organizeData(
        this.state.timePeriodsInGraphs,
        scenariosSelectedList,
        timePeriod,
        values
      );

      let graphData;
      
      if (this.state.timePeriodsInGraphs)
        graphData = this.dataForGraphs(
          this.state.groupBy, validData, scenariosSelectedList, indicatorsSelectedList
        );
      else
        graphData = this.dataForGraphs(
          this.state.groupBy, validData, timePeriod, indicatorsSelectedList
        );

      let legendLabel;
      
      if (this.state.timePeriodsInGraphs)
        legendLabel = this.state.groupBy === "indicator" ? this.props.scenariosLabel : this.props.indicatorsLabel;
      else 
        legendLabel = this.state.groupBy === "indicator" ? this.props.timePeriodsLabel : this.props.indicatorsLabel;

      let exporting = this.exporting(this.props);

      this.myConfig = this.generateConfiguration(
        graphData.xAxis, graphData.yAxis, this.props.isPolar, exporting, 
        this.props.valuesLabel, legendLabel
      );
    }
 
    this.myConfig.sort( (left, right) => {
      if ( left.title.text < right.title.text )
        return -1;
      else if ( left.title.text > right.title.text )
        return 1;
      else
        return 0;
    });

     const graphElement = [];
    this.myConfig.forEach( (item, index) => {
      graphElement.push(<ReactHighcharts key={this.state.groupBy + index} config={item} />);
    });

    const buttonElement = [];

    if (!this.props.isPolar && this.state.timePeriodsInGraphs) {
      buttonElement.push( 
      <div key={this.state.groupBy} className="btn-group">
        {/* <button className="btn btn-info charts charts-button" onClick={this.toggleChartType}>
          {this.state.chartTypeLabel}
        </button> */}
        <button className="btn btn-info charts charts-button" onClick={this.toggleGroupBy}>
            {this.state.groupByLabel}
        </button>
        <button className="btn btn-info charts charts-button" onClick={this.toggleScenarioGraphs}>
          {this.state.graphByYearOrScenarioLabel}
        </button>  
      </div>
      );
    } else if (!this.state.timePeriodsInGraphs){
      buttonElement.push( 
        <div key={this.state.groupBy} className="btn-group">
          {/* <button className="btn btn-info charts charts-button" onClick={this.toggleChartType}>
            {this.state.chartTypeLabel}
          </button> */}
          <button className="btn btn-info charts charts-button" onClick={this.toggleGroupByYearOrIndicator}>
              {this.state.groupByYearOrIndicator}
          </button>
          <button className="btn btn-info charts charts-button" onClick={this.toggleScenarioGraphs}>
            {this.state.graphByYearOrScenarioLabel}
          </button>  
        </div>
        );
    } else {
      buttonElement.push( 
        <div key={this.state.groupBy} className="btn-group">
          <button className="btn btn-info charts-button" onClick={this.toggleGroupBy}>
          {this.state.groupByLabel}
          </button>
          <button className="btn btn-info charts charts-button" onClick={this.toggleScenarioGraphs}>
          {this.state.graphByYearOrScenarioLabel}
        </button>
       </div>  
      );
    }

    return (
       <div>
        {graphElement}
         <div className="control-wrapper">
          {buttonElement}
        </div>
      </div>
    );
  }
}

export default Charts;
