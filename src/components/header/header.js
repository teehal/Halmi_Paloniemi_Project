import React, { Component } from "react";
//import Img from 'react-image';

import "./header.scss";
import "../../index.css";
import Language from "../left-panel/language/Language";
import Help from "../general/Modal";

class Header extends Component {
  render() {
	const language = this.props.language;
    const languageList = this.props.languageList;
    const languageData = this.props.handleLanguageChange;

    return (
      	<div>
	       	<nav className="navbar navbar-expand-lg navbar-light" style={{padding: 2 }}>{/* btn-success */}
		        <a className="navbar-brand animate" >{/* text-white */}
	            	<i className="treeanimate fa fa-tree" aria-hidden="true" /> { ' ' } { this.props.displayTexts.appName } 
	            </a> 
		        <button className = "navbar-toggler" type="button"
		            data-toggle="collapse"
		            data-target="#navbarSupportedContent"
		            aria-controls="navbarSupportedContent"
		            aria-expanded="false"
		            aria-label="Toggle navigation">
	            	<span className="navbar-toggler-icon"></span>
	            </button> 

	            <div className="collapse navbar-collapse" id="navbarSupportedContent">
		            <ul className="navbar-nav mr-auto"/>				            		            		            
        			<Help displayTexts={this.props.displayTexts} />
        			&nbsp; &nbsp;
		            <button type="button"
			            className="btn btn-light qtyDscr"
			            data-toggle="modal"
			            data-target="#qtyModal">
			            {this.props.displayTexts.qualityDescription}
            		</button>
					<div className="language-select">
				        <Language
				            language={language}
				            languageList={languageList}
				            languageData={languageData}
				            languageLabel={this.props.languageLabel}
				            displayTexts={this.props.displayTexts}
				        />
			        </div>	
				 </div>

	            <div className = "modal fade"
		            id = "qtyModal"
		            tabIndex = "-1"
		            role = "dialog"
		            aria-labelledby = "qtyModal"
		            aria-hidden = "true">
		            <div className = "modal-dialog" role = "document">
			            <div className = "modal-content">	
				            <div className = "modal-header">
				            	<h5 className = "modal-title" id = "qualityTitle">{this.props.displayTexts.qualityDescription}</h5> 
					            <button type = "button"
						            className = "close"
						            data-dismiss = "modal"
						            aria-label = "Close" >
					            	<span aria-hidden = "true" > &times; </span> 
					            </button> 
				            </div> 	
				            <div className = "modal-body" > 
				            	{this.props.displayTexts.qualityDescriptionText}
				            	<img src={this.props.displayTexts.underConstructionImage} width="100%" alt=""/>					            
				            </div> 
				            <div className = "modal-footer">
					            <button type = "button"
						            className = "btn btn-secondary close-button"
					            	data-dismiss = "modal">
    								{ this.props.displayTexts.close } 
    							</button> 
							</div> 
						</div> 
					</div> 
				</div> 
        	</nav> 
		</div>
    );
  }
}

export default Header;
