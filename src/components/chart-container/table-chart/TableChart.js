import React, { Component } from "react";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import html2canvas from "html2canvas";
import {saveAs} from "file-saver";
import {dataForGraphs, organizeData} from '../utils/Utils';
import printjs from "print-js";
import TableChartButtons from './TableChartButtons';
import "./table-chart-custom.scss";
import DataTable from "./DataTable";

class TableChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupBy: "indicator",
      groupByLabel: props.groupByIndicatorsLabel,
      groupByYearOrIndicator: props.groupByTimeperiodsLabel,
      timePeriodsInGraphs: true,
      graphByYearOrScenarioLabel: props.graphByScenariosLabel
    }
    this.convertDataToTable = this.convertDataToTable.bind(this);
    this.dataForGraphs = dataForGraphs.bind(this);
    this.organizeData = organizeData.bind(this);
    this.renderPNG = this.renderPNG.bind(this);
    this.renderJPEG = this.renderJPEG.bind(this);
    this.showText = this.showText.bind(this);
    this.toggleGroupBy = this.toggleGroupBy.bind(this);
    this.toggleGroupByYearOrIndicator = this.toggleGroupByYearOrIndicator.bind(this);
    this.toggleScenarioGraphs = this.toggleScenarioGraphs.bind(this);
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

  hideMenu = () => {
    document.getElementById("dropdownMenu").classList.remove("show");
  }

  mouseLeave = () => {
    setTimeout(() => {this.hideMenu();}, 250);
  }

  printTable = () => {
    printjs({printable:'data-table', type: 'html', targetStyles: ['*'], documentTitle:''});
  }

  renderJPEG = () => {
    const self = this;
    this.showText(true);
    html2canvas(document.querySelector("#highcharts"),).then( canvas => {
      canvas.toBlob( function(blob) {
        saveAs(blob, "table.jpg");
        self.showText(false);
      }, "image/jpeg")
    });
  }

  renderPNG = () => {
    const self = this;
    this.showText(true);
    html2canvas(document.querySelector("#highcharts"), {backgroundColor: null}).then( canvas => {
      canvas.toBlob( function(blob) {
        saveAs(blob, "table.png");
        self.showText(false);
      });
    });
  }

  showMenu = () => {
    document.getElementById("dropdownMenu").classList.toggle("show");
  }

  showText(textIsDisplayed) {
    if (textIsDisplayed)
      document.getElementById("sourcetext").classList.toggle("show");
    else
      document.getElementById("sourcetext").classList.remove("show");
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

  toggleGroupByYearOrIndicator() {
    let newGrouping = this.state.groupBy === "indicator" ? 
      "timePeriod" : "indicator";
    let newLabel = newGrouping === "indicator" ? this.props.groupByIndicatorsLabel :
      this.props.groupByTimeperiodsLabel;

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
    let tableData;

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

      if (this.state.timePeriodsInGraphs)
        tableData = this.dataForGraphs(
          this.state.groupBy,validData, scenariosSelectedList, indicatorsSelectedList
        );
      else
        tableData = this.dataForGraphs(
          this.state.groupBy,validData, timePeriod, indicatorsSelectedList
        );
    }

    if (tableData) {

      tableData.yAxis.sort( (left, right) => {
        if ( left.name < right.name )
          return -1;
        else if ( left.name > right.name )
          return 1;
        else
          return 0;
      });

      return (
        <div>
          <DataTable
            convertDataToTable = {this.convertDataToTable}
            groupBy = {this.state.groupBy}
            indicatorsLabel = {this.state.indicatorsLabel}
            mouseLeave = {this.mouseLeave}
            printTable = {this.printTable}
            print = {this.props.print}
            renderJPEG = {this.renderJPEG}
            renderPNG = {this.renderPNG}
            saveAsCSV = {this.props.saveAsCSV}
            saveAsJPEG = {this.props.saveAsJPEG}
            saveAsPNG = {this.props.saveAsPNG}
            scenariosLabel = {this.state.scenariosLabel}
            showMenu = {this.showMenu}
            tableData = {tableData}
            tableToCSV = {this.tableToCSV}
            timePeriodsInGraphs = {this.state.timePeriodsInGraphs}
          />
        <div className="control-wrapper">
          <TableChartButtons
            graphByYearOrScenarioLabel = {this.state.graphByYearOrScenarioLabel}
            groupByLabel = {this.state.groupByLabel}
            groupByYearOrIndicator = {this.state.groupByYearOrIndicator}
            timePeriodsInGraphs = {this.state.timePeriodsInGraphs}
            toggleGroupBy = {this.toggleGroupBy}
            toggleGroupByYearOrIndicator = {this.toggleGroupByYearOrIndicator}
            toggleScenarioGraphs = {this.toggleScenarioGraphs}
          />
        </div>
        </div>
      );
    }
    else
    return (
      <div>
      <div className="control-wrapper">
        <TableChartButtons
          graphByYearOrScenarioLabel = {this.state.graphByYearOrScenarioLabel}
          groupByLabel = {this.state.groupByLabel}
          groupByYearOrIndicator = {this.state.groupByYearOrIndicator}
          timePeriodsInGraphs = {this.state.timePeriodsInGraphs}
          toggleGroupBy = {this.toggleGroupBy}
          toggleGroupByYearOrIndicator = {this.toggleGroupByYearOrIndicator}
          toggleScenarioGraphs = {this.toggleScenarioGraphs}
        />
      </div>
      </div>
    );
  }
}

export default TableChart;
