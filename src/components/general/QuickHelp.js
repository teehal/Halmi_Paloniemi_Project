import React, { Component } from "react";

import constr from "../../images/under_construction2.png";


class QuickHelp extends Component {
	
	
  render() { 

    return (
	    <div className="help">
			<a data-toggle="modal" data-target={this.props.helpLink}>[?]</a> 
            <div
                className="modal fade" 
                id={this.props.helpID}
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
                      {/*<p>{this.props.displayTexts.helpGeneralDescription}</p>
                      <br />
                      <br />*/}
                      <div className="row">

                        <div className="col-md-6">
                          <h5>{this.props.helpTitle}</h5>
                          {/*<p>{this.props.helpText}</p>*/}
                        </div>

                        <div className="col-md-6">
                          <img src={constr} width="100%" alt=""/>
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

export default QuickHelp;
