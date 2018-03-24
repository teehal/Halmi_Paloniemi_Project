import React, { Component } from "react";
import Checkbox from "../../general/Checkbox";

import fourthImage from '../../../images/fourth.png';

class TimePeriods extends Component {
  render() {
    let timePeriods = this.props.timePeriods;
    const listItems = timePeriods.map((item, index) => (
      <Checkbox
        key={item.id}
        id={item.id}
        description={item.description}
        name={item.yearStart + " - " + item.yearEnd}
        selectedDataChange={this.props.selectedDataChange}
        dataType="timePeriod"
        checked={index === 0 ? true : false}
        selectedOptions={this.props.selectedOptions}
      />
    ));
    return (
      <div className="time-periods">
        <h4>{this.props.timePeriodsLabel} 
	        <div className="help">
		        <a data-toggle="modal" data-target="#timePeriodsHelp">[?]</a>
		    </div> 
		</h4>
        {listItems}
        <div
            className="modal fade bd-example-modal-lg"
            id="timePeriodsHelp"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="regionHelp"
            aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
              
	            <div className="modal-content">
		            
		            <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        {this.props.displayTexts.help}
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
	
	                <div className="modal-body">
	                  	<div className="row">
	                    	<div className="col-md-6">
	                      		<h5>{this.props.displayTexts.helpTimePeriodTitle}</h5>
						  		<p>{this.props.displayTexts.helpTimePeriodText}</p>
	                    	</div>
	                    	<div className="col-md-6">
	                          <img src={fourthImage} width="100%" />
	                        </div>
	                    </div>
	                </div>
	                
	                <div className="modal-footer">
	                  	<button
		                    type="button"
		                    className="btn btn-secondary"
		                    data-dismiss="modal">
		                    {this.props.displayTexts.close}
		                </button>	                
	                </div>
	                
	            </div>
            </div>
        </div>    

      </div>
    );
  }
}

export default TimePeriods;
