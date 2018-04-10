import React, { Component } from "react";

import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./charts.css";
import ReactHighcharts from "react-highcharts";
import {dataForGraphs, exporting, generateConfiguration} from '../utils/Utils';
require("highcharts-more")(ReactHighcharts.Highcharts);
require("highcharts-exporting")(ReactHighcharts.Highcharts);

class Charts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupBy: "indicator",
      groupByLabel: props.groupByScenariosLabel,
      chartType: "column",
      chartTypeLabel: props.barTypeLabel,
      pointWidth: 15,
    };

    this.toggleGroupBy = this.toggleGroupBy.bind(this);
    this.toggleChartType = this.toggleChartType.bind(this);
    this.myConfig = [];
    this.exporting = exporting;
    this.dataForGraphs = dataForGraphs;
    this.generateConfiguration = generateConfiguration;
  }

  componentWillReceiveProps(nextProp) {

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

  render() {
    const values = this.props.values;
    const options = this.props.options;

    if (values.length > 0 && options.length > 0) {
      let timePeriod = options.filter(function(e) {
        return e.dataType === "timePeriod";
      });

      let validData = [];
      timePeriod.forEach( (item, index) => {
        validData.push({
          timePeriodId: item.id,
          timePeriodName: item.name,
          data: values.filter(function(e) {
              return e.timePeriodId.toString() === timePeriod[index].id.toString();
             })
        });
      });

      let scenariosSelectedList = options.filter(function(e) {
        return e.dataType === "scenario";
      });

      let indicatorsSelectedList = options.filter(function(e) {
        return e.dataType === "indicator";
      });

      let graphData = this.dataForGraphs(
        this.state.groupBy,validData, scenariosSelectedList, indicatorsSelectedList
      );

      this.myConfig = this.generateConfiguration(
        graphData.xAxis, graphData.yAxis, this.props.isPolar, this.exporting
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

    if (!this.props.isPolar) {
      buttonElement.push( 
      <div key={this.state.groupBy} className="btn-group">
        <button className="btn btn-info charts" onClick={this.toggleChartType}>
          {this.state.chartTypeLabel}
        </button>
        <button className="btn btn-info charts" onClick={this.toggleGroupBy}>
            {this.state.groupByLabel}
        </button>
      </div>
      );
  }
    else {
      buttonElement.push( 
        <button className="btn btn-info" onClick={this.toggleGroupBy}>
        {this.state.groupByLabel}
        </button>
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
