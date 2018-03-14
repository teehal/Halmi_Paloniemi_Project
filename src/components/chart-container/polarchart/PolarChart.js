import React, { Component } from "react";

import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import ReactHighcharts from "react-highcharts";
//require("highcharts-more")(ReactHighcharts.Highcharts);
// require("highcharts-exporting")(ReactHighcharts.Highcharts);

class PolarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupBy: "indicator",
      groupByLabel: "Group by Scenarios",
    //  pointWidth: 5
    };

    this.toggleGroupBy = this.toggleGroupBy.bind(this);
  }

  toggleGroupBy() {
    if (this.state.groupBy === "indicator") {
      this.setState({
        groupBy: "scenario",
        groupByLabel: "Group by Indicators"
      });
    } else {
      this.setState({
        groupBy: "indicator",
        groupByLabel: "Group by Scenarios"
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

      let exporting = {
        buttons: {
          contextButton: {
            menuItems: [
              {
                textKey: "printChart",
                onclick: function() {
                  this.print();
                }
              },
              {
                separator: true
              },
              {
                textKey: "downloadPNG",
                onclick: function() {
                  this.exportChart();
                }
              },
              {
                textKey: "downloadJPEG",
                onclick: function() {
                  this.exportChart({
                    type: "image/jpeg"
                  });
                }
              },
              {
                textKey: "downloadPDF",
                onclick: function() {
                  this.exportChart({
                    type: "application/pdf"
                  });
                }
              },
              {
                textKey: "downloadSVG",
                onclick: function() {
                  this.exportChart({
                    type: "image/svg+xml"
                  });
                }
              }
            ]
          }
        }
      };
      let myConfig = [];

      // console.log("new");
      if (this.state.groupBy === "scenario") {
        let xCategories = [];
        let ySeries = [];
        let tempYSeries = [];

        validData.forEach( (item) => {
          scenariosSelectedList.forEach(scenario => {
            let scenarioId = scenario.id;
            xCategories.push(scenario.name);

              indicatorsSelectedList.forEach(indicator => {
                // console.log(indicatorName);
                let data = item.data.filter(function(e) {
                  return (
                    e.scenarioId.toString() === scenarioId.toString() &&
                    e.indicatorId.toString() === indicator.id.toString()
                  );
                });
                let seriesData = [];
                data.forEach(d => {
                  seriesData.push(d.value);
                });
                let position = tempYSeries.findIndex(
                  element =>
                    element.name === indicator.name && element.id === indicator.id
                );

                if (position === -1 || position === "undefined") {
                  tempYSeries.push({
                    name: indicator.name,
                    data: seriesData,
                    id: indicator.id,
                  });
                } else {
                  tempYSeries[position].data.push(seriesData);
                }
              });
          });
          ySeries.push({name: item.timePeriodName, series: tempYSeries});
          tempYSeries = [];
      });

      ySeries.forEach( (item) => {
        myConfig.push( {
          title: {
            text: this.props.region.name + " " + item.name
          },
          chart: {
            defaultSeriesType: "column", //this.state.chartType,
            backgroundColor: "transparent",
            height: 600, // + ySeries.length * 100,
            polar: true
          },
          tooltip: {
            enabled: false
          },
          // pane: [{
          //   startAngle: 90
          // }],
          xAxis: {
            categories: xCategories,
            crosshair: true
          },
          yAxis: {
            tickAmount: 8,
            min: 0,
            labels: {
              overflow: "justify"
            }
          },
        //   plotOptions: {
        //     series: {
        //         pointWidth: this.state.pointWidth 
        //     }
        //   },
        plotOptions: {
          column: {
              pointPadding: 0.2,
              borderWidth: 0
          },
      },
          series:  item.series,
          exporting: exporting
        })});
      } else {
        let xCategories = [];
        let ySeries = [];
        let tempYSeries =[];

        validData.forEach( (item) => {
          indicatorsSelectedList.forEach(indicator => {
            let indicatorId = indicator.id;
            xCategories.push(indicator.name);
            scenariosSelectedList.forEach(scenario => {
              // console.log(scenario);
              let data = item.data.filter(function(e) {
                return (
                  e.indicatorId.toString() === indicatorId.toString() &&
                  e.scenarioId.toString() === scenario.id.toString()
                );
              });
              let seriesData = [];
              data.forEach(d => {
                seriesData.push(d.value);
              });

              //  search indicator name first
              let position = tempYSeries.findIndex(
                element =>
                  element.name === scenario.name && element.id === scenario.id
              );

              if (position === -1 || position === "undefined") {
                tempYSeries.push({
                  name: scenario.name,
                  data: seriesData,
                  id: scenario.id
                });
              } else {
                tempYSeries[position].data.push(seriesData);
              }
            });
          });
          ySeries.push({name: item.timePeriodName, series: tempYSeries});
          tempYSeries = [];
      });
 
        // console.log("region", this.props.region === "");
      ySeries.forEach( (item) => {
        myConfig.push( {
          title: {
            text: this.props.region.name + " " + item.name
          },
          chart: {
            defaultSeriesType: "column", //this.state.chartType,
            backgroundColor: "transparent",
            height: 600, // + ySeries.length * 100,
            polar: true
          },
          tooltip: {
            enabled: false
          },
          // pane: [{
          //   startAngle: 90
          // }],
          xAxis: {
            categories: xCategories,
            crosshair: true
          },
          yAxis: {
            tickAmount: 8,
            min: 0,
            labels: {
              overflow: "justify"
            }
          },
        //   plotOptions: {
        //     series: {
        //         pointWidth: this.state.pointWidth 
        //     }
        //   },
        plotOptions: {
          column: {
              pointPadding: 0.2,
              borderWidth: 0
          },
      },
          series:  item.series,
          exporting: exporting
        })});
      }

      myConfig.sort( (left, right) => {
        if ( left.title.text < right.title.text )
          return -1;
        else if ( left.title.text > right.title.text )
          return 1;
        else
          return 0;
      });

      const element = [];
      myConfig.forEach( (item, index) => {
        element.push(<ReactHighcharts key={this.state.groupBy + index} config={item} />);
      });

      return (
        <div>
          {element}
          <div className="text-center">
            <button className="btn btn-info" onClick={this.toggleGroupBy}>
              {this.state.groupByLabel}
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="text-center">
            <button className="btn btn-info" onClick={this.toggleGroupBy}>
              {this.state.groupByLabel}
            </button>
          </div>
        </div>
      );
    }
  }
}

export default PolarChart;
