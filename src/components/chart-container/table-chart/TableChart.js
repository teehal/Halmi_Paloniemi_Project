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

  dataForGraphs(groupBy, data, scenarios, indicators) {
    let xCategories = [];
    let ySeries = [];
    let tempYSeries = [];
    let groupingBy = groupBy === "scenario" ? scenarios : indicators;
    let grouped = groupBy === "scenario" ? indicators : scenarios;

    data.forEach( (item) => {
      groupingBy.forEach(first_item => {
        let first_itemId = first_item.id;

        if ( xCategories.indexOf(first_item.name) === -1 )
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


  renderImage = (index) => {
    html2canvas(document.querySelector("#highcharts-" + index)).then( canvas => {
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
    console.log(yser);
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

    const values = this.props.values;
    const options = this.props.options;
    let tableData;

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

      tableData = this.dataForGraphs(
        "indicator",validData, scenariosSelectedList, indicatorsSelectedList
      );
    }

    const tableChart = [];
    if ( tableData ) {
      console.log(`yAxis len ${tableData.yAxis.length}`);
      console.log(tableData.xAxis);

      tableData.yAxis.sort( (left, right) => {
        if ( left.name < right.name )
          return -1;
        else if ( left.name > right.name )
          return 1;
        else
          return 0;
      });

      tableData.yAxis.forEach( (element, element_index) => {

        let dataTableHead = element.series.map( (item) => (
          <th scope="col" className="text">{item.name}</th>
        ));

        let dataTableRow = tableData.xAxis.map( (item, index) => (
          <tr><th scope="row" className="text">{item}</th>
          {element.series.map( (ser_item) => (<td className="number">{ser_item.data[index]}</td>))}</tr>
        ));

        let convertToPNG = <button className="btn" onClick={this.renderImage.bind(this, element_index)}>Save as PNG</button>
        console.log(element.series[element_index]);
        let convertToCSV = <button className="btn" 
          onClick={this.tableToCSV.bind(this, tableData.xAxis, element.series)}>
          ToCSV</button> 

        let dataTable = <div id={"highcharts-" + element_index} className="highcharts-data-table"><table>
          <caption className="highcharts-caption">{element.name}</caption>
          <thead><tr><th scope="col" className="text"></th>{dataTableHead}</tr></thead>
          <tbody>{dataTableRow}</tbody></table>
          {convertToPNG}
          {convertToCSV}
          </div> 
        
        tableChart.push(dataTable);
        });
       
    }

    return (
      <div>
        {tableChart}
        {/* <ReactHighcharts config={config} /> */}
        {/* <button className="btn" onClick={this.renderImage}>Save as PNG</button>
        <button className="btn" onClick={this.tableToCSV.bind(this, xCategories, ySeries)}>ToCSV</button> */}
      </div>
    );
  }
}

export default TableChart;
