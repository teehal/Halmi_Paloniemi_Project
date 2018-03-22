import React, { Component } from "react";
import Select from "react-select";
import Checkbox from "../../general/Checkbox";

class Scenarios extends Component {
  constructor(props) {
    super(props);

    this.state = { scenarioValues: [] }
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
      if ( second_arr.indexOf(item) === -1 )
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

    const listItems = [ 
      <Select
        name = "scenarios"
        multi = {true}
        options = {this.scenarioOptions(scenarios)}
        onChange = {(option) => this.handleChange(option)}
        value = {this.state.scenarioValues}
        dataType = "scenario"
        closeOnSelect = {false}
      />];
    // const listItems = scenarios.map((item, index) => (
    //   <Checkbox
    //     key={item.id}
    //     id={item.id}
    //     name={item.name}
    //     description={item.description}
    //     selectedDataChange={this.props.selectedDataChange}
    //     dataType="scenario"
    //     checked={index === 0 ? true : false}
    //     selectedOptions={this.props.selectedOptions}
    //   />
    // ));
    return (
      <div className="scenarios">
        <h4>{this.props.scenariosLabel}</h4>
        <div className="item_list">
          {listItems}
        </div>
      </div>
    );
  }
}

export default Scenarios;
