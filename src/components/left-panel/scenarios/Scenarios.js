import React, { Component } from "react";
import Checkbox from "../../general/Checkbox";
import QuickHelp from "../../general/QuickHelp";

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
        <h4>
	        {this.props.scenariosLabel} 
	        <QuickHelp 
	        	helpTitle={this.props.displayTexts.helpRegionTitle} 
	        	helpText={this.props.displayTexts.helpRegionText}
	        	helpImage={this.props.displayTexts.helpRegionLevelImage}
	        	helpID="helpScenarios"
	        	helpLink="#helpScenarios"
	        	language={this.props.language}
	        	displayTexts={this.props.displayTexts}
			/>    
		</h4>
        {listItems}
      </div>
    );
  }
}

export default Scenarios;
