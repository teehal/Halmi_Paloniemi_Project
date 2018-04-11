import React, { Component } from "react";

import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import html2canvas from "html2canvas";
import {saveAs} from "file-saver";
import {dataForGraphs} from '../utils/Utils';
import printjs from "print-js";
import "./table-chart-custom.scss";

class TableChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupBy: "indicator",
      groupByLabel: props.groupByIndicatorsLabel
    }
    this.toggleGroupBy = this.toggleGroupBy.bind(this);
    this.renderImage = this.renderImage.bind(this);
    this.convertDataToTable = this.convertDataToTable.bind(this);
    this.dataForGraphs = dataForGraphs.bind(this);
    //this.printjs = printJS.bind(this);
  }

  componentWillReceiveProps(nextProp) {

    if (this.state.groupBy === "scenario") {
      this.setState({
        groupByLabel: nextProp.groupByScenariosLabel
      });
    } else {
      this.setState({
        groupByLabel: nextProp.groupByIndicatorsLabel
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
          <td key={i + '' + j + index}>{data[j].series[i].data[index]}</td>
        );
      }
    }

    return returnArray;
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

  printTable = () => {
    printjs({printable:'data-table', type: 'html', targetStyles: ['*'], honorMarginPadding:false, documentTitle:'', maxWidth:200});
  }

  renderImage = (index) => {
    html2canvas(document.querySelector("#highcharts")).then( canvas => {
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

      let headColumnSpan = tableData.yAxis.length;
      let numberOfScenarios = tableData.yAxis[0].series.length;
      let dataTableHead, dataTableRow;
      let dataTableYearHead = [];
     
      tableData.yAxis.forEach( (element, element_index) => {
        dataTableHead = element.series.map( item => 
          <th key={item.name} scope="col" colSpan={headColumnSpan} className="text header">{item.name}</th>
        );
      });

      dataTableYearHead = Array.apply(null, {length: numberOfScenarios}).map( item =>
        tableData.yAxis.map( element => 
          <th key={element.name} className="text header">{element.name}</th>
      ));

      dataTableRow = tableData.xAxis.map( (x_item, index) => (
          <tr key={x_item + index}>
            <th key={x_item} scope="row" className="text">{x_item}</th>
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
            <div className="print-button-separator">
              <button className="menu-button" onClick={this.printTable}>{this.props.print}</button>
            </div>
            <button className="menu-button" onClick={this.renderImage}>{this.props.saveAsPNG}</button>
            <button className="menu-button" onClick={this.tableToCSV.bind(this, tableData)}>{this.props.saveAsCSV}</button>
          </div>
        </div>

      let dataTable = <div key={'hc1'} id={"highcharts"} className="highcharts-data-table">{conversionMenu}
        <table id="data-table">
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
