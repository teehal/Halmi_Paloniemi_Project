import React, { Component } from "react";
import Select from "react-select";
import {Button} from 'react-bootstrap'
import "react-select/dist/react-select.css";

import * as FormControlNames from "../../general/FormControls";

class Region extends Component {

  state = {
    dropdownDisabledBool: true
  };

  handleChange = value => {
    if (value !== null) {
      this.props.regionData(value);
    } else {
      this.props.regionData("");
    }
  };

  componentWillReceiveProps() {
    if (this.props.regionList !== undefined || null) {
      this.setState({ dropdownDisabledBool: false });
    } else {
      this.setState({ dropdownDisabledBool: true });
    }
  }
  

  render() {
    const regionList = this.props.regionList;
    const region = this.props.region;

    return (
      <div>
        <h4>
	        {this.props.regionLabel} 
			{/*<div className="help">
				<Button
					bsStyle='link'
					name={FormControlNames.REGION}
					onClick={this.props.onToggleAccordionModalClick}>
					[?]
		        </Button>
	        </div>*/}
		</h4>     
        <Select
          className=""
          clearable = {false}
          clearableValue = {false}
          disabled={this.state.dropdownDisabledBool}
          name={FormControlNames.REGION}
          onChange={this.handleChange}
          options={regionList}
          value={region}
        />
           
      </div>
    );
  }
}

export default Region;
