import React, { Component } from "react";
import Select from "react-select";
import Checkbox from "../../general/Checkbox";

class TimePeriods extends Component {
  constructor(props) {
    super(props)

    this.state = { timePeriodValues: [] }
  }

  defaultValue(timeperiods) {
    this.setState({ timePeriodValues: [
      {value: timeperiods[0].id, label: timeperiods[0].yearStart + " - " + timeperiods[0].yearEnd}
    ]});
  }

  handleChange = (option) => {
    let tempArray = option;

    if ( option.length > 0 )
      this.setState( {timePeriodValues: tempArray} );
    else
      alert("This item is mandatory!.");
  }

  timePeriodOptions = (timeperiods) => {
    let options = [];

    timeperiods.forEach( (element) => {
      options.push( {value: element.id, label: element.yearStart + " - " + element.yearEnd} );
    });
    return options;
  }

  render() {
    let timePeriods = this.props.timePeriods;

    if ( !this.state.timePeriodValues.length && timePeriods.length )
      this.defaultValue(timePeriods);

    const listItems = [
      <Select
      name = "timeperiods"
      multi = {true}
      options = {this.timePeriodOptions(timePeriods)}
      onChange = {(option) => this.handleChange(option)}
      value = {this.state.timePeriodValues}
      dataType = "timePeriod"
      closeOnSelect = {false}
    />];
    //   timePeriods.map((item, index) => (
    //   <Checkbox
    //     key={item.id}
    //     id={item.id}
    //     description={item.description}
    //     name={item.yearStart + " - " + item.yearEnd}
    //     selectedDataChange={this.props.selectedDataChange}
    //     dataType="timePeriod"
    //     checked={index === 0 ? true : false}
    //     selectedOptions={this.props.selectedOptions}
    //   />
    // ));
    return (
      <div className="time-periods">
        <h4>{this.props.timePeriodsLabel}</h4>
        <div className="item_list">
          {listItems}
        </div>
      </div>
    );
  }
}

export default TimePeriods;
