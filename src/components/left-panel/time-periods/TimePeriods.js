import React, { Component } from "react";
import Select from "react-select";
import QuickHelp from "../../general/QuickHelp";

class TimePeriods extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      currentRegionId: props.region,
      currentRegionalLevelId: props.regionalLevel,
      timePeriodValues: []
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProp) {
    let newRegion = nextProp.selectedOptions.filter( (element) => {
      return element.dataType === "region";
    });

    let newRegional = nextProp.selectedOptions.filter( (element) => {
      return element.dataType === "regionalLevel";
    });

    let scenarioCollectionChanged = this.props.scenarioCollection.id !== nextProp.scenarioCollection.id;
    let newRegionId = newRegion.length ? newRegion[0].id : -1;
    let newRegionalId = newRegional.length ? newRegional[0].id : -1;

    let regionHasChanged = this.state.currentRegionId !== newRegionId;
    let regionalLevelHasChanged = this.state.currentRegionalLevelId !== newRegionalId;

    if ( (nextProp.timePeriods.length && !this.state.timePeriodValues.length) || 
      ((regionHasChanged || regionalLevelHasChanged || scenarioCollectionChanged) && nextProp.timePeriods.length))
      this.setState({ 
        timePeriodValues: [{
          value: nextProp.timePeriods[0].id, 
          label: nextProp.timePeriods[0].yearStart + " - " + nextProp.timePeriods[0].yearEnd
        }],
        currentRegionId: newRegionId,
        currentRegionalLevelId: newRegionalId
      });
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
      alert(this.props.isMandatoryAlertLabel);
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
    
    const listItems = [
      <Select
        closeOnSelect = {false}  
        dataType = "timePeriod"
        key = {timePeriods.length}
        multi = {true}
        name = "timeperiods"
        onChange = {(option) => this.handleChange(option)}
        options = {this.timePeriodOptions(timePeriods)}
        value = {this.state.timePeriodValues}
      />];

    return (
      <div className="time-periods">
        <h4>{this.props.timePeriodsLabel}
          <QuickHelp 
          	displayTexts={this.props.displayTexts}
	        	helpTitle={this.props.displayTexts.helpTimePeriodTitle} 
	        	helpText={this.props.displayTexts.helpTimePeriodText}
	        	helpImage={this.props.displayTexts.helpTimePeriodImage}
	        	helpID="helpTimePeriods"
	        	helpLink="#helpTimePeriods"
	        	language={this.props.language}
     			/>    
        </h4>
        <div className="item_list">
          {listItems}
        </div>
      </div>
    );
  }
}

export default TimePeriods;
