import React, { Component } from "react";

import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./charts.css";
import ReactHighcharts from "react-highcharts";
require("highcharts-more")(ReactHighcharts.Highcharts);
require("highcharts-exporting")(ReactHighcharts.Highcharts);

class Charts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupBy: "indicator",
      groupByLabel: "Group by Scenarios",
      chartType: "column",
      chartTypeLabel: "Bar chart",
      pointWidth: 15,
    };

    this.toggleGroupBy = this.toggleGroupBy.bind(this);
    this.toggleChartType = this.toggleChartType.bind(this);
    this.myConfig = [];

    this.exporting = {
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
  }

  toggleChartType() {
    if (this.state.chartType === "column") {
      this.setState({
        chartType: "bar",
        chartTypeLabel: "Column chart"
      });
    } else {
      this.setState({
        chartType: "column",
        chartTypeLabel: "Bar chart"
    });
  }
  }

  // toggleChartTypeArr(index) {
  //   if (this.state.chartArr[index] === "column") {
  //     let temp_arr = this.state.chartArr.slice();
  //     let temp_arr2 = this.state.chartLabelArr.slice();
  //     temp_arr[index] = 'bar';
  //     temp_arr2[index] = 'Column';
  //     this.setState({
  //       chartArr: temp_arr,
  //       chartTypeLabel: temp_arr2
  //     });
  //   } else {
  //     let temp_arr = this.state.chartArr.slice();
  //     let temp_arr2 = this.state.chartLabelArr.slice();
  //     temp_arr[index] = 'column';
  //     temp_arr2[index] = 'Bar chart';
  //     this.setState({
  //       chartType: temp_arr,
  //       chartLabelArr: temp_arr2
  //   });
  // }
  // }

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

  // toggleGroupByArr(index) {
  //   let temp_arr = this.state.groupByArr.slice();
  //   let temp_arr2 = this.state.groupByLabelArr.slice();

  //   if (this.state.groupByArr[index] === "indicator") {
  //     temp_arr[index] = 'scenario';
  //     temp_arr2[index] = 'Group by Indicators';
  //     this.setState({
  //       groupByArr: temp_arr,
  //       groupByLabelArr: temp_arr2
  //     });
  //   } else {
  //     temp_arr[index] = 'indicator';
  //     temp_arr2[index] = 'Group by Scenarios';
  //     this.setState({
  //       groupByArr: temp_arr,
  //       groupByLabelArr: temp_arr2
  //     });
  //   }
  // }

  dataForGraphs(groupBy, data, scenarios, indicators) {
    let xCategories = [];
    let ySeries = [];
    let tempYSeries = [];
    let groupingBy = groupBy === "scenario" ? scenarios : indicators;
    let grouped = groupBy === "scenario" ? indicators : scenarios;

    data.forEach( (item) => {
      groupingBy.forEach(first_item => {
        let first_itemId = first_item.id;
        xCategories.push(first_item.name);

          grouped.forEach(second_item => {
            let data = [];
            // console.log(indicatorName);
            if (groupBy === "scenario") {
               data = item.data.filter(function(e) {
                return (
                  e.scenarioId.toString() === first_itemId.toString() &&
                  e.indicatorId.toString() === second_item.id.toString()
                );
              });
            } else {
              data = item.data.filter(function(e) {
                return (
                  e.indicatorId.toString() === first_itemId.toString() &&
                  e.scenarioId.toString() === second_item.id.toString()
                );
              });
            }
            let seriesData = [];
            data.forEach(d => {
              seriesData.push(d.value);
            });
            let position = tempYSeries.findIndex(
              element =>
                element.name === second_item.name && element.id === second_item.id
            );

            if (position === -1 || position === "undefined") {
              tempYSeries.push({
                name: second_item.name,
                data: seriesData,
                id: second_item.id,
              });
            } else {
              tempYSeries[position].data.push(seriesData);
            }
          });
      });
      ySeries.push({name: item.timePeriodName, series: tempYSeries});
      tempYSeries = [];
  });
  return {xAxis: xCategories, yAxis: ySeries};
  }

  generateConfiguration(xaxis, yaxis, itIsPolar, exporting) {
    let myConfig = [];
    let height_polar = 600;
    let height = this.state.chartType === "column" ? 400 :
          400 + yaxis[0].series.length * 65 + xaxis.length * 55
    let pointWidth = itIsPolar ? null : this.state.pointWidth;
   
    yaxis.forEach( (item) => {
      myConfig.push( {
        title: {
          text: this.props.region.name + " " + item.name
        },
        chart: {
          polar: itIsPolar,
          defaultSeriesType: this.state.chartType,
          backgroundColor: "transparent",
          height: itIsPolar ? height_polar : height
        },
        xAxis: {
          categories: xaxis,
          crosshair: true
        },
        yAxis: {
          max: itIsPolar ? 1 : undefined,
          tickAmount: itIsPolar ? 5 : undefined,
          min: 0,
          labels: {
            overflow: "justify"
          }
        },
        plotOptions: {
          series: {
              pointWidth: pointWidth
          }
        }, 
        series: item.series,
        exporting: exporting
    })});
  
    return myConfig;
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

      // let groupByArr = timePeriod.map( timePeriod => 'indicator');
      // let chartTypeArr = timePeriod.map( timePeriod => 'column');
      // let chartLabelArr = timePeriod.map( timePeriod => 'Column');
      // let groupByLabelArr = timePeriod.map( timePeriod => "Group by Scenarios");

      // this.setState({
      //   groupArr: groupByArr,
      //   chartArr: chartTypeArr,
      //   chartLabelArr: chartLabelArr,
      //   groupByLabelArr: groupByLabelArr
      // });


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
    // if (!this.props.isPolar) {
    //     buttonElement.push( 
    //     <div key={this.state.groupBy} className="text-center">
    //       <button className="btn btn-info barchart" onClick={this.toggleChartType}>
    //         {this.state.chartTypeLabel}
    //       </button>
    //     </div>
    // );
    // }
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

    // this.myConfig.forEach( (item, index) => {
    //   graphElement.push(
    //     <div>
    //     <ReactHighcharts key={this.state.groupBy + index} config={item} />
    //       <div className="text-center">
    //         <button className="btn btn-info" onClick={this.toggleGroupBy}>
    //           {this.state.groupByLabel}
    //         </button>
    //       </div>
    //     {buttonElement}
    //     </div>);
    // });

    return (
    //graphElement
      <div>
        {graphElement}
          {/* <div className="text-center">
          <button className="btn btn-info" onClick={this.toggleGroupBy}>
            {this.state.groupByLabel}
          </button>
        </div> */}
        <div className="control-wrapper">
          {buttonElement}
        </div>
      </div>
    );
  }
}

export default Charts;
