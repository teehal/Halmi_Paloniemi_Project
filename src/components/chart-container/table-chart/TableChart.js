import React, { Component } from "react";

import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import html2canvas from "html2canvas";
import {saveAs} from "file-saver";
import "./table-chart-custom.scss";
//import { removeTable } from "./utils.js";
// import ReactHighcharts from "react-highcharts";
// import Highcharts from "../../../../node_modules/highcharts";
// require("highcharts-exporting")(ReactHighcharts.Highcharts);
// require("../../../../node_modules/highcharts/modules/export-data")(Highcharts);

class TableChart extends Component {

  renderImage = (format) => {
    html2canvas(document.querySelector("div.highcharts-data-table")).then( canvas => {
      var base64image = canvas.toDataURL("image/png");
      window.open(base64image , "_blank");
      canvas.toBlob( function(blob) {
        saveAs(blob, "table.png");
      });
    });
  }

  tableToCSV = (xcat, yser) => {
    let tempArr = [];
    let CSVtext = '';

    yser.forEach( (item) => {
      tempArr.push(item.name);
    });

    CSVtext += ' ,' + tempArr.join() + '\n';

    xcat.forEach( (element, index) => {
      tempArr = [];
      tempArr.push(element);
      yser.forEach( (item) => { tempArr.push(item.data[index]) });
      CSVtext += tempArr.join() + '\n';
    });

    let blob = new Blob([CSVtext], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "table.csv");

    console.log(CSVtext);
  }

  render() {
    //removeTable();
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
          ySeries[position].data.push(seriesData[0]);
        }
      });
    });
    //console.log(ySeries);
    // console.log(this.props.region.name);
    const dataTableHead = ySeries.map( (item) => (
      <th scope="col" className="text">{item.name}</th>
    ));
    const dataTableRow = xCategories.map( (item, index) => (
      <tr><th scope="row" className="text">{item}</th>
        {ySeries.map( (element) => (<td className="number">{element.data[index]}</td>))}</tr>
    ));
    const dataTable = <div className="highcharts-data-table"><table>
      <thead><tr><th scope="col" className="text"></th>{dataTableHead}</tr></thead>
      <tbody>{dataTableRow}</tbody></table></div>

    //console.log(dataTableHead);
    //const highTable = '<div class="highcharts-data-table"><table><caption class="highcharts-table-caption">Kainuu 2018 - 2022</caption><thead><tr><th scope="col" class="text">Category</th><th scope="col" class="text">Suurin nettotulo</th><th scope="col" class="text">Ilmasto- ja energiapoliittinen</th><th scope="col" class="text">Mustikkasato</th></tr></thead><tbody><tr><th scope="row" class="text">Kantohinta-arvo</th><td class="number">0.13</td><td class="number">0.18</td><td class="number">0.74</td></tr><tr><th scope="row" class="text">Lahopuun määrä</th><td class="number">0.22</td><td class="number">0.59</td><td class="number">0.66</td></tr><tr><th scope="row" class="text">Nettotulojen nykyarvo</th><td class="number">0.99</td><td class="number">0.9</td><td class="number">0.56</td></tr><tr><th scope="row" class="text">Tukkikertymä</th><td class="number">0.65</td><td class="empty"></td><td class="number">0.3</td></tr></tbody></table></div>'
    // let config = {
    //   title: {
    //    // text: this.props.region.name + " " + timePeriod.name,
    //     useHTML: true,
    //     text: "42"
    //   },

    //   chart: {
    //     type: "line",
    //     spacingBottom: 30,
    //     backgroundColor: "transparent",
    //     // events: {
    //     //   render: function() {
    //     //     document.getElementsByTagName("th")[0].innerHTML = "";
    //     //   }
    //     // }
    //   },

    //   tooltip: {
    //     enabled: false
    //   },

    //   plotOptions: {
    //     series: {
    //       enableMouseTracking:false,
    //       lineWidth: 0,
    //       pointWidth: 0,
    //       marker: {
    //         radius: 0
    //       }
    //      }
    //   },

    //   yAxis: {
    //     visible:false,
    //     title: {
    //       text: "Values"
    //     }
    //   },
    //   legend: {
    //     layout: "vertical",
    //     align: "right",
    //     verticalAlign: "middle"
    //   },

    //   xAxis: {
    //     visible: false,
    //     categories: xCategories
    //   },

    //   series: ySeries,
 
    //   exporting: {
    //     showTable: true,
    //     allowHTML:true,
    //     buttons: {
    //       contextButton: {
    //         menuItems: [
    //           {
    //             textKey: "printChart",
    //             onclick: function() {
    //               this.print();
    //             }
    //           },
    //           {
    //             separator: true
    //           },
    //           {
    //             textKey: "downloadPNG",
    //             onclick: function() {
    //               this.exportChart();
    //             }
    //           },
    //           {
    //             textKey: "downloadJPEG",
    //             onclick: function() {
    //               this.exportChart({
    //                 type: "image/jpeg"
    //               });
    //             }
    //           },
    //           {
    //             textKey: "downloadPDF",
    //             onclick: function() {
    //               this.exportChart({
    //                 type: "application/pdf"
    //               });
    //             }
    //           },
    //           {
    //             textKey: "downloadSVG",
    //             onclick: function() {
    //               this.exportChart({
    //                 type: "image/svg+xml"
    //               });
    //             }
    //           },

    //           { separator: true },
    //           {
    //             textKey: "downloadXLS",
    //             onclick: function() {
    //               this.downloadXLS();
    //             }
    //           },
    //           {
    //             textKey: "downloadCSV",
    //             onclick: function() {
    //               this.downloadCSV();
    //             }
    //           }
    //         ]
    //       }
    //     }
    //   }
    // };
    // console.log(config);
    return (
      <div>
        {dataTable}
        {/* <ReactHighcharts config={config} /> */}
        <button className="btn" onClick={this.renderImage}>Save as PNG</button>
        <button className="btn" onClick={this.tableToCSV.bind(this, xCategories, ySeries)}>ToCSV</button>
      </div>
    );
  }
}

export default TableChart;
