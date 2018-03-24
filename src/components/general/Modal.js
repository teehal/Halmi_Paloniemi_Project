import React, { Component } from "react";

class Help extends Component {
  
  render() { 
	  //console.log("Modal props: ", this.props);
	  console.log("Modal RegionImage: ", this.props.displayTexts.helpRegionImage);
    return (
	    <div>
		    <button 
			    type="button"
	            className="btn btn-light help-button"
	            data-toggle="modal"
	            data-target="#questionModal">
	            {this.props.displayTexts.help}{/*&nbsp;<i className="fa fa-info" />*/}
	        </button>
			{/*<a data-toggle="modal" data-target="#questionModal"><h4>{this.props.displayTexts.help}</h4></a> */}
            <div
                className="modal fade" 
                id="questionModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="questionModal"
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
                      <p>{this.props.displayTexts.helpGeneralDescription}</p>
                      <br />
                      <br />
                      <div className="row">
                        <div className="col-md-5">
                          <h5>{this.props.displayTexts.helpRegionLevelTitle}</h5>
                          <p>{this.props.displayTexts.helpRegionLevelText}</p>
                        </div>
                        <div className="col-md-6">
                          <img src={this.props.displayTexts.helpRegionLevelImage} width="100%" />
                        </div>
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-md-5">
                          <h5>{this.props.displayTexts.helpRegionTitle}</h5>
                          <p>{this.props.displayTexts.helpRegionText}</p>
                        </div>
                        <div className="col-md-6">
                          <img src={this.props.displayTexts.helpRegionImage} width="100%" />
                        </div>
                      </div>                      
                      <br />
                      <div className="row">
                        <div className="col-md-5">
                          <h5>{this.props.displayTexts.helpScenarioTitle}</h5>
                          <p>{this.props.displayTexts.helpScenarioText}</p>
                        </div>
                        <div className="col-md-6">
                          <img src={this.props.displayTexts.helpScenarioImage} width="100%" />
                        </div>
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-md-5">
                          <h5>{this.props.displayTexts.helpTimePeriodTitle}</h5>
                          <p>{this.props.displayTexts.helpTimePeriodText}</p>
                        </div>
                        <div className="col-md-6">
                          <img src={this.props.displayTexts.helpTimePeriodImage} width="100%" />
                        </div>
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-md-5">
                          <h5>{this.props.displayTexts.helpIndicatorsTitle}</h5>
                          <p>{this.props.displayTexts.helpIndicatorsText}</p>
                        </div>
                        <div className="col-md-6">
                          <img src={this.props.displayTexts.helpIndicatorsImage} width="100%" />
                        </div>
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-md-5">
                          <h5>{this.props.displayTexts.helpTablesTitle}</h5>
                          <p>{this.props.displayTexts.helpTablesText}</p>
                        </div>
                        <div className="col-md-6">
                          <img src={this.props.displayTexts.helpTablesImage} width="100%" />
                        </div>
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-md-5">
                          <h5>{this.props.displayTexts.helpSaveTitle}</h5>
                          <p>{this.props.displayTexts.helpSaveText}</p>
                        </div>
                        <div className="col-md-6">
                          <img src={this.props.displayTexts.helpSaveImage} width="100%" />
                        </div>
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-md-5">
                          <h5>{this.props.displayTexts.helpDescriptionsTitle}</h5>
                          <p>{this.props.displayTexts.helpDescriptionsText}</p>
                        </div>
                      </div>
                      
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
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

export default Help;
