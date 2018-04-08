import React, { Component } from "react";

import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import html2canvas from "html2canvas";
import {saveAs} from "file-saver";
import "./table-chart-custom.scss";

class TableChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupBy: "indicator",
      groupByLabel: props.groupByScenariosLabel
    }
    this.toggleGroupBy = this.toggleGroupBy.bind(this);
    this.renderImage = this.renderImage.bind(this);
    this.convertDataToTable = this.convertDataToTable.bind(this);
  }

  componentWillReceiveProps(nextProp) {
    
    if (this.state.groupBy === "indicator") {
      this.setState({
        groupByLabel: this.props.groupByScenariosLabel
      });
    } else {
      this.setState({
        groupByLabel: this.props.groupByIndicatorsLabel
      });
    }
  }

  convertDataToTable( data, index ) {
    let returnArray = [];
    let seriesLenght = data[0].series.length;
    let dataLength = data.length;

    for ( let i = 0; i < seriesLenght; i++) {
      for ( let j = 0; j < dataLength; j++) {
        returnArray.push(
          <td>{data[j].series[i].data[index]}</td>
        );
      }
    }

    return returnArray;
  }

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

  toggleGroupBy() {
    if (this.state.groupBy === "indicator") {
      this.setState({
        groupBy: "scenario",
        groupByLabel: this.props.groupByScenariosLabel
      });
    } else {
      this.setState({
        groupBy: "indicator",
        groupByLabel: this.props.groupByIndicatorsLabel
      });
    }
  }

  hideMenu = () => {
    document.getElementById("dropdownMenu").classList.remove("show");
  }

  mouseLeave = () => {
    setTimeout(() => {this.hideMenu();}, 250);
  }

  renderImage = (index) => {
    html2canvas(document.querySelector("#highcharts")).then( canvas => {
      // var base64image = canvas.toDataURL("image/png");
    //  window.open(base64image , "_blank");
      canvas.toBlob( function(blob) {
        saveAs(blob, "table.png");
      });
    });
  }

  showMenu = (index) => {
    document.getElementById("dropdownMenu").classList.toggle("show");
  }

  tableToCSV = (data) => {
    let tempNameArr = [];
    let tempArr = [];
    let CSVtext = '';
    let ydata = data.yAxis;
    let xdata = data.xAxis;

    ydata[0].series.forEach( (item) => {
      tempNameArr.push(item.name);
    });

     ydata.forEach( (y_item) => {
      CSVtext += y_item.name + ' ,' + tempNameArr.join() + '\n';
      xdata.forEach( (element, index) => {
        tempArr = [];
        tempArr.push(element);
        y_item.series.forEach( (item) => { tempArr.push(item.data[index]) });
        CSVtext += tempArr.join() + '\n';
      });
    });

    let blob = new Blob([CSVtext], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "table.csv");
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
        this.state.groupBy, validData, scenariosSelectedList, indicatorsSelectedList
      );
    }

    const tableChart = [];

    if ( tableData ) {
      tableData.yAxis.sort( (left, right) => {
        if ( left.name < right.name )
          return -1;
        else if ( left.name > right.name )
          return 1;
        else
          return 0;
      });
      console.log(tableData.yAxis);

      let headColumnSpan = tableData.yAxis.length;
      let numberOfScenarios = tableData.yAxis[0].series.length;
      let dataTableHead, dataTableRow;
      let dataTableYearHead = [];
     
      tableData.yAxis.forEach( (element, element_index) => {
        dataTableHead = element.series.map( item => 
          <th scope="col" colSpan={headColumnSpan} className="text header">{item.name}</th>
        );
      });

      dataTableYearHead = Array.apply(null, {length: numberOfScenarios}).map( item =>
        tableData.yAxis.map( element => 
          <th className="text header">{element.name}</th>
      ));

      dataTableRow = tableData.xAxis.map( (x_item, index) => (
          <tr>
            <th scope="row" className="text">{x_item}</th>
            {this.convertDataToTable(tableData.yAxis, index)}
          </tr>
      ));

      let conversionMenu = 
        <div className="dropdown" data-html2canvas-ignore onMouseLeave={this.mouseLeave.bind(this)}>
          <div className="dropdown-bars" onClick={this.showMenu.bind(this)}>
            <div className="dropdown-menu-bars">
              <div className="menu-bar"></div>
              <div className="menu-bar"></div>
              <div className="menu-bar"></div>
            </div>
          </div>          
          <div id={"dropdownMenu"} className="dropdown-content">
            <button className="menu-button" onClick={this.renderImage}>{this.props.saveAsPNG}</button>
            <button className="menu-button" onClick={this.tableToCSV.bind(this, tableData)}>{this.props.saveAsCSV}</button>
          </div>
        </div>

      let dataTable = <div id={"highcharts"} className="highcharts-data-table">{conversionMenu}
        <table>
        {/* <caption className="highcharts-caption">{element.name}</caption> */}
        <thead><tr><th scope="col" className="text"></th>{dataTableHead}</tr></thead>
        <tbody>
        <tr><th scope="col" className="text"></th>{dataTableYearHead}</tr>
        {dataTableRow}</tbody></table>
        </div> 
      
      tableChart.push(dataTable);
    }
    const buttonElement = <button className="btn btn-info" onClick={this.toggleGroupBy}>
                            {this.state.groupByLabel}
                          </button>

    return (
      <div>
        {tableChart}
        <div className="control-wrapper">
          {buttonElement}
        </div>
      </div>
    );
  }
}

export default TableChart;
