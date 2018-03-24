import React, { Component } from "react";
import Checkbox from "../general/Checkbox";

import "./rightpanel.scss";
import QuickHelp from "../general/QuickHelp";

class RightPanel extends Component {
  render() {
    let indicatorCategories = this.props.indicatorCategories;
    // console.log(this.props.indicatorCategories);
    const listItems = indicatorCategories.map((item, index) => (
      <div key={index} className="indicators">
        <h4>
          {item.name}&nbsp;{item.isMandatory === 1 ? "*" : ""}
        </h4>

        {item.indicators.map((indicator, index) => {
          if (index === 0 && item.isMandatory) {
            // console.log(`MANDATORY: id of ${indicator.name} is ${indicator.id}`)
            return (
              <Checkbox
                key={indicator.id}
                id={indicator.id}
                description={indicator.description}
                name={indicator.name}
                dataType="indicator"
                selectedDataChange={this.props.handleSelectedDataChange}
                checked={true}
                selectedOptions={this.props.selectedOptions}
              />
            );
          } else {
            // console.log(`NO MANDA: id of ${indicator.name} is ${indicator.id}`)
            return (
              <Checkbox
                key={indicator.id}
                id={indicator.id}
                description={indicator.description}
                name={indicator.name}
                dataType="indicator"
                selectedDataChange={this.props.handleSelectedDataChange}
                checked={false}
                selectedOptions={this.props.selectedOptions}
              />
            );
          }
          //console.log(index, index === 0 && item.isMandatory ? true : false),
        })}
      </div>
    ));

    // console.log('listItems:', listItems);

    return (
      <div className="panel-container content-panel shadow-1">
        <h3 className="header-spacing-panels">
          {this.props.indicatorSelectionLabel}
           <QuickHelp 
	        	helpTitle={this.props.displayTexts.helpIndicatorsTitle} 
	        	helpText={this.props.displayTexts.helpIndicatorsText}
	        	helpImage={this.props.displayTexts.helpIndicatorsImage}
	        	helpID="helpIndicators"
	        	helpLink="#helpIndicators"
	        	language={this.props.language}
	        	displayTexts={this.props.displayTexts}
			/> 
        </h3>
        {listItems}
      </div>
    );
  }
}

export default RightPanel;
