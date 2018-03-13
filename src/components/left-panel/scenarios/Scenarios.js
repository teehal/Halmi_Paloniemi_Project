import React, { Component } from "react";
import Checkbox from "../../general/Checkbox";

class Scenarios extends Component {
  render() {
    let scenarios = this.props.scenarios;
    const listItems = scenarios.map((item, index) => (
      <Checkbox
        key={item.id}
        id={item.id}
        name={item.name}
        description={item.description}
        selectedDataChange={this.props.selectedDataChange}
        dataType="scenario"
        checked={index === 0 ? true : false}
        selectedOptions={this.props.selectedOptions}
      />
    ));
    return (
      <div className="scenarios">
        <h4>{this.props.scenariosLabel}</h4>
        {listItems}
      </div>
    );
  }
}

export default Scenarios;
