import React, { Component } from "react";
import Select from "react-select";
import {Button} from 'react-bootstrap'
import * as FormControlNames from "../../general/FormControls";

class Scenarios extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      currentRegionId: props.region,
      currentRegionalLevelId: props.regionalLevel,
      scenarioValues: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProp) {

    let scenarioCollectionChanged = this.props.scenarioCollection.id !== nextProp.scenarioCollection.id;
 
    let newRegion = nextProp.selectedOptions.filter( (element) => {
      return element.dataType === "region";
    });

    let newRegional = nextProp.selectedOptions.filter( (element) => {
      return element.dataType === "regionalLevel";
    });

    let newRegionId = newRegion.length ? newRegion[0].id : -1;
    let newRegionalId = newRegional.length ? newRegional[0].id : -1;

    let regionHasChanged = this.state.currentRegionId !== newRegionId;
    let regionalLevelHasChanged = this.state.currentRegionalLevelId !== newRegionalId;

    if ( (nextProp.scenarios.length && !this.state.scenarioValues.length) || 
      ((regionHasChanged || regionalLevelHasChanged  || scenarioCollectionChanged) && nextProp.scenarios.length)) {
        this.setState({ 
          scenarioValues: [{
            value: nextProp.scenarios[0].id, 
            label: nextProp.scenarios[0].name}
            ],
          currentRegionId: newRegionId,
          currentRegionalLevelId: newRegionalId
        });
        return;
    }

    if (nextProp.scenarios.length && this.props.scenarios.length) {
      // Check for language change and update labels
      if ( nextProp.scenarios[0].name !== this.props.scenarios[0].name ) {
        let values = this.state.scenarioValues.slice();
        values.forEach( (element) => {
          let position = nextProp.scenarios.findIndex( (item) => {
            return element.value === item.id
          });
          element.label = nextProp.scenarios[position].name;
        });
        this.setState({
          scenarioValues: values,
          currentScenariosLanguage: nextProp.language
        });
        this.props.updateSelectedOptions(this.state.scenarioValues, "scenario");
      }
    }
  }

  defaultValue(scenarios) {
    this.setState({ scenarioValues: [
      {value: scenarios[0].id, label: scenarios[0].name}
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
      alert(this.props.isMandatoryAlertLabel);
  }


  scenarioOptions = (scenarios) => {
    let options = [];

    scenarios.forEach( (element) => {
      options.push( {value: element.id, label: element.name} );
    });
    return options;
  }

  render() {
    let scenarios = this.props.scenarios;

    const listItems = [ 
      <Select
        closeOnSelect = {false} 
        dataType = "scenario"
        key = {scenarios.length}
        multi = {true}
        name = "scenarios"
        onChange = {(option) => this.handleChange(option)}
        options = {this.scenarioOptions(scenarios)}
        value = {this.state.scenarioValues}
      />];

    return (
      	<div className="scenarios">
	        <h4>{this.props.scenariosLabel}
				<div className="help">
					<Button
						bsStyle='link'
						name={FormControlNames.SCENARIOS}
						onClick={this.props.onToggleAccordionModalClick}>
						[?]
			    </Button>
	         	</div>
			</h4>
	        <div className="item_list">
	          {listItems}
	        </div> 
      	</div>
    );
  }
}

export default Scenarios;
