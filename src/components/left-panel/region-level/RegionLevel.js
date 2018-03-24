import React, { Component } from "react";
import Select from "react-select";
import "react-select/dist/react-select.css";
import QuickHelp from "../../general/QuickHelp";
import firstImage from '../../../images/first.png';

class RegionLevels extends Component {

  state = {
    dropdownDisabledBool: true
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this); 
  }

  componentWillMount(){
    if(this.props.regionalLevelList === undefined){
      this.setState({dropdownDisabledBool: true});
    }else{
      this.setState({dropdownDisabledBool: false});
    }
  }

  handleChange = value => {
    if (value !== null) {
      this.props.regionalLevelData(value);
    } else {
      this.props.regionalLevelData("");
    }
  };

  render() {
    const regionalLevel = this.props.regionalLevel;
    const regionalLevelList = this.props.regionalLevelList;
    
    return (
      <div>
        <h4>
	        {this.props.regionalLevelLabel} 
	        <QuickHelp 
	        	helpTitle={this.props.displayTexts.helpRegionLevelTitle} 
	        	helpText={this.props.displayTexts.helpRegionLevelText}
	        	helpImage={this.props.displayTexts.helpRegionLevelImage}
	        	helpID="helpRegionLevel"
	        	helpLink="#helpRegionLevel"
	        	language={this.props.language}
	        	displayTexts={this.props.displayTexts}
			/>    
		</h4>
        <Select
          placeholder="Select region level"
          value={regionalLevel}
          onChange={this.handleChange}
          options={regionalLevelList}
          disabled={this.state.dropdownDisabledBool}
        />  
      </div>
    );
  }
}

export default RegionLevels;
