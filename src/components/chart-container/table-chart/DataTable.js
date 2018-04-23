import React, { Component } from 'react';

class DataTable extends Component {
    render() {

        let headColumnSpan = this.props.timePeriodsInGraphs ? this.props.tableData.yAxis.length : 1;
        let yearHeadColumnSpan = this.props.timePeriodsInGraphs ? 1 : this.props.tableData.yAxis[0].series.length;
        let numberOfScenarios = this.props.tableData.yAxis[0].series.length;
        let dataTableHead = [], dataTableRow;
        let dataTableYearHead = [];
        let tableChart = [];
       
        if (this.props.timePeriodsInGraphs) 
          this.props.tableData.yAxis.forEach( (element, element_index) => {
            dataTableHead = element.series.map( item => 
              <th key={item.name} scope="col" colSpan={headColumnSpan} className="text header">{item.name}</th>
            );
          });
        else
          this.props.tableData.yAxis.forEach( (element, element_index) => {
            element.series.forEach( item => 
              dataTableHead.push(<th key={item.name + element_index} scope="col" colSpan={headColumnSpan} className="text header">{item.name}</th>
            ));
          });
  
        if (this.props.timePeriodsInGraphs)
          dataTableYearHead = Array.apply(null, {length: numberOfScenarios}).map( item =>
            this.props.tableData.yAxis.map( element => 
              <th key={element.name} colSpan={yearHeadColumnSpan} className="text header">{element.name}</th>
          ));
        else
          dataTableYearHead.push(
            this.props.tableData.yAxis.map( element => 
              <th key={element.name} colSpan={yearHeadColumnSpan} className="text header">{element.name}</th>
          ));
  
        dataTableRow = this.props.tableData.xAxis.map( (x_item, index) => (
            <tr key={x_item + index}>
              <th key={x_item} scope="row" className="text">{x_item}</th>
              {this.props.convertDataToTable(this.props.tableData.yAxis, index)}
            </tr>
        ));
  
        let conversionMenu = 
          <div className="dropdown" data-html2canvas-ignore onMouseLeave={this.props.mouseLeave.bind(this)}>
            <div className="dropdown-bars" onClick={this.props.showMenu.bind(this)}>
              <div className="dropdown-menu-bars">
                <div className="menu-bar"></div>
                <div className="menu-bar"></div>
                <div className="menu-bar"></div>
              </div>
            </div>          
            <div id={"dropdownMenu"} className="dropdown-content">
              <div className="print-button-separator">
                <button className="menu-button" onClick={this.props.printTable}>{this.props.print}</button>
              </div>
              <button className="menu-button" onClick={this.props.renderPNG}>{this.props.saveAsPNG}</button>
              <button className="menu-button" onClick={this.props.renderJPEG}>{this.props.saveAsJPEG}</button>
              <button className="menu-button" onClick={this.props.tableToCSV.bind(this, this.props.tableData)}>{this.props.saveAsCSV}</button>
            </div>
          </div>
  
        let caption;
  
        if (this.props.timePeriodsInGraphs)
          caption = this.props.groupBy === "indicator" ? this.props.scenariosLabel : this.props.indicatorsLabel;
        else
          caption = this.props.scenariosLabel;
  
        let dataTable = [];
        const Style = {
          fontSize: '6pt',
          border: '0px'
        };
        
        if (this.props.timePeriodsInGraphs)
          dataTable.push(
            <div key={'hc1'} id={"highcharts"} className="highcharts-data-table">{conversionMenu}
            <table id="data-table">
            <caption className="highcharts-caption">{caption}</caption>
            <thead><tr><th scope="col" className="text"></th>{dataTableHead}</tr></thead>
            <tbody>
            <tr><th scope="col" className="text"></th>{dataTableYearHead}</tr>
            {dataTableRow}</tbody>
            <tfoot id="sourcetext" className="hidden-text"><tr className="hidden-tr">
              <td style={Style}>Lähde: Metsämittari/Luke | Source: Forest Indicator/Luke</td>
            </tr></tfoot>
            </table>
            </div> 
          );
        else
          dataTable.push(
            <div key={'hc1'} id={"highcharts"} className="highcharts-data-table">{conversionMenu}
            <table id="data-table">
            <caption className="highcharts-caption">{caption}</caption>
            <thead><tr><th scope="col" className="text"></th>{dataTableYearHead}</tr></thead>
            <tbody>
            <tr><th scope="col" className="text"></th>{dataTableHead}</tr>
            {dataTableRow}</tbody>
            <tfoot id="sourcetext" className="hidden-text"><tr className="hidden-tr">
              <td style={Style}>Lähde: Metsämittari/Luke | Source: Forest Indicator/Luke</td>
            </tr></tfoot>
            </table>
            </div> 
          );
        
        tableChart.push(dataTable);
      
        return (
            <div>
                {dataTable}
            </div>
        );
    }
}

export default DataTable;