import React, { Component } from "react";

import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import "./table-chart-custom.scss";
import { removeTable } from "./utils.js";
import ReactHighcharts from "react-highcharts";
import Highcharts from "../../../../node_modules/highcharts";
require("highcharts-exporting")(ReactHighcharts.Highcharts);
require("../../../../node_modules/highcharts/modules/export-data")(Highcharts);

class TableChart extends Component {
  render() {
    removeTable();
    const values = this.props.values;
    const options = this.props.options;

    let timePeriod = options.filter(function(e) {
      return e.dataType === "timePeriod";
    })[0];

    let validData = values.filter(function(e) {
      return e.timePeriodId.toString() === timePeriod.id.toString();
    });

    let scenariosSelectedList = options.filter(function(e) {
      return e.dataType === "scenario";
    });

    let indicatorsSelectedList = options.filter(function(e) {
      return e.dataType === "indicator";
    });

    // console.log(indicatorsSelectedList);

    let xCategories = [];
    let ySeries = [];

    indicatorsSelectedList.forEach(indicator => {
      xCategories.push(indicator.name);
      // console.log(xCategories);
      scenariosSelectedList.forEach(scenario => {
        let data = validData.filter(function(e) {
          return (
            e.scenarioId.toString() === scenario.id.toString() &&
            e.indicatorId.toString() === indicator.id.toString()
          );
        });

        let seriesData = [];
        data.forEach(d => {
          seriesData.push(d.value);
        });
        // console.log(seriesData);
        //  search indicator name first
        let position = ySeries.findIndex(
          element =>
            element.name === scenario.name && element.id === scenario.id
        );
        // console.log(position);

        if (position === -1 || position === "undefined") {
          ySeries.push({
            name: scenario.name,
            data: seriesData,
            id: scenario.id
          });
        } else {
          ySeries[position].data.push(seriesData);
        }
      });
    });

    // console.log(this.props.region.name);

    let config = {
      title: {
        text: this.props.region.name + " " + timePeriod.name
      },

      chart: {
        spacingBottom: 30,
        backgroundColor: "transparent",
        events: {
          render: function() {
            document.getElementsByTagName("th")[0].innerHTML = "";
          }
        }
      },

      yAxis: {
        title: {
          text: "Values"
        }
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle"
      },

      xAxis: {
        categories: xCategories
      },

      series: ySeries,

      exporting: {
        showTable: true,
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
              },

              { separator: true },
              {
                textKey: "downloadXLS",
                onclick: function() {
                  this.downloadXLS();
                }
              },
              {
                textKey: "downloadCSV",
                onclick: function() {
                  this.downloadCSV();
                }
              }
            ]
          }
        }
      }
    };
    // console.log(config);
    return (
      <div>
        <ReactHighcharts config={config} />
      </div>
    );
  }
}

export default TableChart;
