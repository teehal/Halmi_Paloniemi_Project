import React, { Component } from 'react';

class TableChartButtons extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        if (this.props.timePeriodsInGraphs)
          return (
            <div className="btn-group">
            <button className="btn btn-info  table-chart" onClick={this.props.toggleGroupBy}>
              {this.props.groupByLabel}
            </button>
            <button className="btn btn-info table-chart" onClick={this.props.toggleScenarioGraphs}>
                {this.props.graphByYearOrScenarioLabel}
            </button>
            </div>
          );
        else
          return (
            <div className="btn-group">
            <button className="btn btn-info  table-chart" onClick={this.props.toggleGroupByYearOrIndicator}>
              {this.props.groupByYearOrIndicator}
            </button>
            <button className="btn btn-info table-chart" onClick={this.props.toggleScenarioGraphs}>
                {this.props.graphByYearOrScenarioLabel}
            </button>
            </div>
          );
    }
}

export default TableChartButtons;