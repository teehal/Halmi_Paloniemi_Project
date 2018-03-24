import React, { Component } from "react";
import Select from "react-select";
import "react-select/dist/react-select.css";

import QuickHelp from "../../general/QuickHelp";
//import firstImage from '../../../images/first.png';

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
	    //console.log("Region texts: ", this.props.displayTexts);
//   console.log("Region props: ", this.props);
//   console.log("Region state: ", this.state);
    const regionList = this.props.regionList;
    const region = this.props.region;

    return (
      <div>
        <h4>
	        {this.props.regionLabel} 
	        <QuickHelp 
	        	helpTitle={this.props.displayTexts.helpRegionTitle} 
	        	helpText={this.props.displayTexts.helpRegionText}
	        	helpImage={this.props.displayTexts.helpRegionLevelImage}
	        	helpID="helpRegion"
	        	helpLink="#helpRegion"
	        	language={this.props.language}
	        	displayTexts={this.props.displayTexts}
			/>    
		</h4>        
        <Select
          name=""
          className=""
          value={region}
          onChange={this.handleChange}
          options={regionList}
          disabled={this.state.dropdownDisabledBool} 
        />
           
      </div>
    );
  }
}

export default Region;
