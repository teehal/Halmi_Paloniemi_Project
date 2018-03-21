import React, { Component } from "react";
import Checkbox from "../general/Checkbox";
import Select from "react-select";

import "./rightpanel.scss";

class RightPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {indValues: []};
    // this.indicatorOptions = this.indicatorOptions.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    console.log("indCat " + this.props.indicatorCategories.length);
  }

  indicatorOptions = (indicators, isMandatory) => {
    let options = [];

    indicators.map( (indicator) => {
      options.push({value: indicator.id, label: indicator.name, isMandatory: isMandatory});
    });
    return options;
  }

  handleChange = (option, index) => {
    let tempArray = this.state.indValues.slice();

    if ( !option.length && tempArray[index][0].isMandatory )
      alert("The item is mandatory!");
    else {
      tempArray[index] = option;
      this.setState( {indValues: tempArray});
    }
  }

  updateIndValues = (categories) => {
    let tempArray = [];
    categories.forEach( (item, index) => {
      let tempIndOpts = this.indicatorOptions(item.indicators, item.isMandatory);
      if ( item.isMandatory  )
        tempArray.push([tempIndOpts[0]]);
      else 
        tempArray.push([]);
    });
    this.setState( {indValues: tempArray} );
  }

  render() {
    let indicatorCategories = this.props.indicatorCategories;
    // console.log(this.props.indicatorCategories);
    if ( this.state.indValues.length === 0 && indicatorCategories.length )
      this.updateIndValues(indicatorCategories);

    const listItems = indicatorCategories.map((item, index) => (
      <div key={index} className="indicators">
        <h4>
          {item.name}&nbsp;{item.isMandatory === 1 ? "*" : ""}
        </h4>
        
        <div className="item_list">
        <Select
                name = "indicators"
                multi = {true}
                options = {this.indicatorOptions(item.indicators, item.isMandatory)}
                onChange = {(option) => this.handleChange(option,index)}
                value = {this.state.indValues[index]}
                id = {index.toString()}
                dataType = "indicator"
                closeOnSelect = {false}
        />
        {/* {item.indicators.map((indicator, index) => {
          if (index === 0 && item.isMandatory) {
            // console.log(`MANDATORY: id of ${indicator.name} is ${indicator.id}`)
            return (
              <Select
                name = "indicators"
                multi = {true}
                options = {this.indicatorOptions(item.indicators)}
              />
              // <Checkbox
              //   key={indicator.id}
              //   id={indicator.id}
              //   description={indicator.description}
              //   name={indicator.name}
              //   dataType="indicator"
              //   selectedDataChange={this.props.handleSelectedDataChange}
              //   checked={true}
              //   selectedOptions={this.props.selectedOptions}
              // />
            );
          } else {
            // console.log(`NO MANDA: id of ${indicator.name} is ${indicator.id}`)
            return (
              <Select
              name = "indicators"
              multi = {true}
              options = {this.indicatorOptions(item.indicators)}
            />
              // <Checkbox
              //   key={indicator.id}
              //   id={indicator.id}
              //   description={indicator.description}
              //   name={indicator.name}
              //   dataType="indicator"
              //   selectedDataChange={this.props.handleSelectedDataChange}
              //   checked={false}
              //   selectedOptions={this.props.selectedOptions}
              // />
            );
          }
          //console.log(index, index === 0 && item.isMandatory ? true : false),
        })} */}
        </div>
      </div>
    ));

    // console.log('listItems:', listItems);

    return (
      <div className="panel-container content-panel shadow-1">
        <h3 className="header-spacing-panels">
          {this.props.indicatorSelectionLabel}
        </h3>
          {listItems}
      </div>
    );
  }
}

export default RightPanel;
