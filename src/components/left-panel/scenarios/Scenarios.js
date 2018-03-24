import React, { Component } from "react";
import Select from "react-select";
import QuickHelp from "../../general/QuickHelp";

class Scenarios extends Component {
  constructor(props) {
    super(props);

    this.state = { scenarioValues: [] };
    this.handleChange = this.handleChange.bind(this);
  }

  scenarioOptions = (scenarios) => {
    let options = [];

    scenarios.forEach( (element) => {
      options.push( {value: element.id, label: element.name} );
    });
    return options;
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

    if ( this.state.scenarioValues.length > option.length && option.length ) {
      let index = this.findMissingElementIndex(this.state.scenarioValues, option);
      let element = this.state.scenarioValues.slice(index, index + 1);
      this.props.selectedDataChange({dataType: "scenario", 
        name: element[0].label, id: element[0].value.toString()});
      this.setState( {scenarioValues: option} );
    }
    else if ( option.length > 0 ) {
      let lastElement = option.slice(-1);
      this.setState( {scenarioValues: option} );
      this.props.selectedDataChange({dataType: "scenario", 
          name: lastElement[0].label, id: lastElement[0].value.toString()});
    }
    else
      alert("This item is mandatory!.");
  }

  defaultValue(scenarios) {
    this.setState({ scenarioValues: [
      {value: scenarios[0].id, label: scenarios[0].name}
    ]});
  }

  render() {
    let scenarios = this.props.scenarios;

    if ( !this.state.scenarioValues.length && scenarios.length )
      this.defaultValue(scenarios);
    let values = this.props.selectedOptions.map( (element) => {
      if (element.dataType === "scenario")
        return {value: Number(element.id), label: element.name};
      });

    const listItems = [ 
      <Select
        name = "scenarios"
        multi = {true}
        options = {this.scenarioOptions(scenarios)}
        onChange = {(option) => this.handleChange(option)}
        value = {values}//{this.state.scenarioValues}
        dataType = "scenario"
        closeOnSelect = {false}
      />];

    return (
      	<div className="scenarios">
	        <h4>{this.props.scenariosLabel}
	        	<QuickHelp 
		        	helpTitle={this.props.displayTexts.helpScenariosTitle} 
		        	helpText={this.props.displayTexts.helpScenariosText}
		        	helpImage={this.props.displayTexts.helpScenariosImage}
		        	helpID="helpRegion"
		        	helpLink="#helpRegion"
		        	language={this.props.language}
		        	displayTexts={this.props.displayTexts}
				/>    
	        </h4>
	        <div className="item_list">
	          {listItems}
	        </div> 
      	</div>
    );
  }
}

export default Scenarios;
