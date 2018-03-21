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

  handleChange = (option) => {
    let tempArray = option;

    if ( option.length > 0 )
      this.setState( {scenarioValues: tempArray} );
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
