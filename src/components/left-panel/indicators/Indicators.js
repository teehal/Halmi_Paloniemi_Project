import React, { Component } from "react";
import Select from "react-select";
import {Button} from 'react-bootstrap'
import "./indicators.scss";
import * as FormControlNames from "../../general/FormControls";

class Indicators extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      currentIndicatorsLanguage: props.language,
      currentRegionId: props.region.id,
      currentRegionalLevelId: props.regionalLevel,
      indValues: [],
     };

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
    let newRegionId = newRegion.length ? newRegion[0].id : 0;
    let newRegionalId = newRegional.length ? newRegional[0].id : 0;

    let regionHasChanged = this.state.currentRegionId !== newRegionId;
    let regionalLevelHasChanged = this.state.currentRegionalLevelId !== newRegionalId;

    if ( (nextProp.indicatorCategories.length && !this.state.indValues.length) || 
      ((regionHasChanged || regionalLevelHasChanged || scenarioCollectionChanged) && nextProp.indicatorCategories.length)) {
        this.updateIndValues(nextProp.indicatorCategories);
        this.setState({ 
          currentRegionId: newRegionId,
          currentRegionalLevelId: newRegionalId
        });
      return;
    }

    if (nextProp.indicatorCategories.length && this.props.indicatorCategories.length) {
      // Check for language change and update if needed.
      if ( nextProp.indicatorCategories[0].name !== this.props.indicatorCategories[0].name ) {
        let values = this.state.indValues.slice();
        values.forEach( (element, index) => {
          element.forEach( (item) => {
            let position = nextProp.indicatorCategories[index].indicators.findIndex( (indicator_item) => {
              return item.value === indicator_item.id
            });
            item.label = nextProp.indicatorCategories[index].indicators[position].name;
          });
          
        });
        this.setState({
          indValues: values,
          currentIndicatorsLanguage: nextProp.language
        });

        this.state.indValues.forEach( (element) => {
          if ( element.length )
            this.props.updateSelectedOptions(element, "indicator");
        });
      }
  }
  }

  handleChange = (option, index) => {
    let tempArray = this.state.indValues.slice();
    tempArray[index] = option;

    if (this.state.indValues[index].length > option.length && option.length) {
      let missingIndex = this.findMissingElementIndex(
        this.state.indValues[index],
        option
      );
      let element = this.state.indValues[index].slice(
        missingIndex[0],
        missingIndex[0] + 1
      );
      this.props.selectedDataChange({
        dataType: "indicator",
        name: element[0].label,
        id: element[0].value.toString(),
        absVar: element[0].absVar
      });
      this.setState({ indValues: tempArray });
    } else if (option.length > 0) {
      let lastElement = option.slice(-1);
      this.setState({ indValues: tempArray });
      this.props.selectedDataChange({
        dataType: "indicator",
        name: lastElement[0].label,
        id: lastElement[0].value.toString(),
        absVar: lastElement[0].absVar
      });
    } else if (this.state.indValues[index][0].isMandatory !== 1) {
      let missingIndices = this.findMissingElementIndex(
        this.state.indValues[index],
        option
      );
      let element = [];
       missingIndices.forEach( (item) => {
          element.push(this.state.indValues[index].slice(
            item,
            item + 1
          )
        )});
      element.forEach((item) => {
        this.props.selectedDataChange({
          dataType: "indicator",
          name: item[0].label,
          id: item[0].value.toString(),
          absVar: item[0].absVar
        });
      });
      this.setState({ indValues: tempArray });
    } else alert(this.props.isMandatoryAlertLabel);
  };

  indicatorOptions = (indicators, isMandatory) => {
    let options = [];

    indicators.map(indicator => {
      options.push({
        value: indicator.id,
        label: indicator.name,
        isMandatory: isMandatory,
        absVar: indicator.absVar
      });
      return true;
    });
    return options;
  };

  findMissingElementIndex = (first_arr, second_arr) => {
    //let value = -1;
    let value = [];

    first_arr.forEach((item, index) => {
      let counter = 0;
      second_arr.forEach(element => {
        if (item.value === element.value) counter++;
      });
      if (!counter) value.push(index);
    });

    return value;
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

    const listItems = indicatorCategories.map((item, index) => (
      <div key={index} className="indicators">
        <h4>
          {item.name}&nbsp;{item.isMandatory === 1 ? "*" : ""}
        </h4>

        <div className="item_list">
          <Select
            closeOnSelect={false}
            dataType="indicator"
            id={index.toString()}
            multi={true}
            name={FormControlNames.INDICATORS}
            onChange={option => this.handleChange(option, index)}
            options={this.indicatorOptions(item.indicators, item.isMandatory)}
            value={this.state.indValues[index]}
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
