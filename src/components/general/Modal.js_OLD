import React, { Component } from "react";
import ReactModal from "react-modal";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  render() {
    let customStyles = {
      content: {
        width: "75%",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)"
      }
    };
    return (
      <div>
        <a onClick={this.openModal}>
          <h4>{this.props.guidanceLabel}</h4>
        </a>
        <ReactModal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel={this.props.guidanceLabel}
          style={customStyles}
        >
          <div className="">
            <div className="text-center">
              <h1>Welcome to the Forest Indicator Service</h1>
              <h1><small>This guidance will show you how to use our application</small></h1>
            </div>
            <ul class="list-group">
              <li class="list-group-item">
                Step 1: Choose the regional level, region and scenario
                collection by clicking the option in the dropdown menu.
              </li>
              <li class="list-group-item">
                Step 2: Choose the scenario and time periods as you wish to use
                in the graph.
              </li>
              <li class="list-group-item">
                Step 3: Choose the indicators from the indicator categories.
              </li>
              <li class="list-group-item">
                Step 4: Choose the type of chart that you want to use.
              </li>
            </ul>

            <div className="text-center">
              <p>
                Additionally, if you discover any error on our application
                please giving us feedback. By clicking “Give us a feedback”
                button, you’ll be lead to Mail app of Microsoft where you can
                sign in and type the feedback. The e-mail address of feedback
                receiver is automatically being filled so that after typing the
                feedback, you just need to click sent.
              </p>
            </div>
          </div>
          <button className="btn btn-default pull-right" onClick={this.closeModal}>
            Close
          </button>
        </ReactModal>
      </div>
    );
  }
}

export default Modal;
