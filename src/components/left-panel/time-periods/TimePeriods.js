import React, { Component } from "react";
import Select from "react-select";
import {Button} from 'react-bootstrap'
import * as FormControlNames from "../../general/FormControls";

class TimePeriods extends Component {
  constructor(props) {
    super(props)

    this.state = { timePeriodValues: [] }
  }

  defaultValue(timeperiods) {
    this.setState({ timePeriodValues: [
      {value: timeperiods[0].id, label: timeperiods[0].yearStart + " - " + timeperiods[0].yearEnd,
        dataType: "timePeriod"}
    ]});
  }

  findMissingElementIndex = (first_arr, second_arr) => {
    let value = -1

    first_arr.forEach( (item, index) => {
      let counter = 0;
      second_arr.forEach((element) => {
        if ( item.value === element.value )
          counter++;
      });
      if ( !counter )
        value = index;
    });

    return value;
  }

  handleChange = (option) => {
  
    if ( this.state.timePeriodValues.length > option.length && option.length ) {
      let index = this.findMissingElementIndex(this.state.timePeriodValues, option);
      let element = this.state.timePeriodValues.slice(index, index + 1);
      this.props.selectedDataChange({dataType: "timePeriod", 
        name: element[0].label, id: element[0].value.toString()});
      this.setState( {timePeriodValues: option} );
    }
    else if ( option.length > 0 ) {
      let lastElement = option.slice(-1);
      this.setState( {timePeriodValues: option} );
      this.props.selectedDataChange({dataType: "timePeriod", 
          name: lastElement[0].label, id: lastElement[0].value.toString()});
    }
    else
      alert("This item is mandatory!.");
  }

  timePeriodOptions = (timeperiods) => {
    let options = [];

    timeperiods.forEach( (element) => {
      options.push( {value: element.id, label: element.yearStart + " - " + element.yearEnd });
    });
    
    return options;
  }

  render() {
    let timePeriods = this.props.timePeriods;

    if ( !this.state.timePeriodValues.length && timePeriods.length )
      this.defaultValue(timePeriods);

    let values = this.props.selectedOptions.map( (element) => {
      if (element.dataType === "timePeriod")
        return {value: Number(element.id), label: element.name};
      return true;	
    });

    const listItems = [
      <Select
        name = "timeperiods"
        multi = {true}
        options = {this.timePeriodOptions(timePeriods)}
        onChange = {(option) => this.handleChange(option)}
        value = {values}//{this.state.timePeriodValues}
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
        <h4>{this.props.timePeriodsLabel}
			<div className="help">
				<Button
					bsStyle='link'
					name={FormControlNames.TIME_PERIOD}
					onClick={this.props.onToggleAccordionModalClick}>
					[?]
		         </Button>
         	</div>
		</h4>
        <div className="item_list">
          {listItems}
        </div>
      </div>
    );
  }
}

export default TimePeriods;
