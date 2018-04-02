import React, { Component } from "react";
import Select from "react-select";
import {Button} from 'react-bootstrap'
import "./indicators.scss";
import * as FormControlNames from "../../general/FormControls";

class Indicators extends Component {
  constructor(props) {
    super(props);

    this.state = { indValues: [] };

    this.handleChange = this.handleChange.bind(this);
  }

  indicatorOptions = (indicators, isMandatory) => {
    let options = [];

    indicators.map(indicator => {
      options.push({
        value: indicator.id,
        label: indicator.name,
        isMandatory: isMandatory
      });
      return true;
    });
    return options;
  };

  findMissingElementIndex = (first_arr, second_arr) => {
    let value = -1;

    first_arr.forEach((item, index) => {
      let counter = 0;
      second_arr.forEach(element => {
        if (item.value === element.value) counter++;
      });
      if (!counter) value = index;
    });

    return value;
  };

  handleChange = (option, index) => {
    let tempArray = this.state.indValues.slice();
    tempArray[index] = option;

    if (this.state.indValues[index].length > option.length && option.length) {
      let missingIndex = this.findMissingElementIndex(
        this.state.indValues[index],
        option
      );
      let element = this.state.indValues[index].slice(
        missingIndex,
        missingIndex + 1
      );
      this.props.selectedDataChange({
        dataType: "indicator",
        name: element[0].label,
        id: element[0].value.toString()
      });
      this.setState({ indValues: tempArray });
    } else if (option.length > 0) {
      let lastElement = option.slice(-1);
      this.setState({ indValues: tempArray });
      this.props.selectedDataChange({
        dataType: "indicator",
        name: lastElement[0].label,
        id: lastElement[0].value.toString()
      });
    } else if (this.state.indValues[index][0].isMandatory !== 1) {
      let missingIndex = this.findMissingElementIndex(
        this.state.indValues[index],
        option
      );
      let element = this.state.indValues[index].slice(
        missingIndex,
        missingIndex + 1
      );
      this.props.selectedDataChange({
        dataType: "indicator",
        name: element[0].label,
        id: element[0].value.toString()
      });
      this.setState({ indValues: tempArray });
    } else alert("This item is mandatory!.");
  };

  updateIndValues = categories => {
    let tempArray = [];
    categories.forEach((item, index) => {
      let tempIndOpts = this.indicatorOptions(
        item.indicators,
        item.isMandatory
      );
      if (item.isMandatory) tempArray.push([tempIndOpts[0]]);
      else tempArray.push([]);
    });
    this.setState({ indValues: tempArray });
  };

  render() {
    let indicatorCategories = this.props.indicatorCategories;

    if (this.state.indValues.length === 0 && indicatorCategories.length) {
      this.updateIndValues(indicatorCategories);
    }
    let values = [];

    indicatorCategories.forEach(element => {
      let tempArray = [];
      element.indicators.forEach(indicator => {
        this.props.selectedOptions.forEach(item => {
          if (
            item.dataType === "indicator" &&
            Number(item.id) === Number(indicator.id)
          )
            tempArray.push({ value: Number(item.id), label: item.name });
        });
      });
      values.push(tempArray);
    });
    

    const listItems = indicatorCategories.map((item, index) => (
      <div key={index} className="indicators">
        <h4>
          {item.name}&nbsp;{item.isMandatory === 1 ? "*" : ""}
        </h4>

        <div className="item_list">
          <Select
            name={FormControlNames.INDICATORS}
            multi={true}
            options={this.indicatorOptions(item.indicators, item.isMandatory)}
            onChange={option => this.handleChange(option, index)}
            value={values[index]} //{this.state.indValues[index]}
            id={index.toString()}
            dataType="indicator"
            closeOnSelect={false}
          />
        </div>
      </div>
    ));

    return (
      <div className="panel-container content-panel shadow-1">
        <h3 className="header-spacing-panels">
          	{this.props.indicatorSelectionLabel}
			<div className="help">
				<Button
					bsStyle='link'
					name={FormControlNames.INDICATORS}
					onClick={this.props.onToggleAccordionModalClick}>
					[?]
		        </Button>
         	</div>
        </h3>
        {listItems}
      </div>
    );
  }
}

export default Indicators;
