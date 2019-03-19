import React, { Component } from 'react';
import {
   Modal, Button, FormControl, FormGroup,
} from 'react-bootstrap';

export default class MsgModal extends Component {
   constructor(props) {
      super(props);

      this.state = {
         msgContent: ''
      }

      this.cancelButton = this.close.bind(this, "Cancel");
      this.handleChange = this.handleChange.bind(this);
   }

   close = (result) => {
      this.props.onDismiss && this.props.onDismiss({
         status: result,
         content: this.state.msgContent
      });
      this.setState({ msgContent: "" });
   }

   getValidationState = () => {
      if (this.state.msgContent) {
         return null
      }
      return "warning";
   }

   handleChange = (event) => {
      this.setState({ msgContent: event.target.value });
   }

   render() {
      return (
         <Modal show={this.props.showModal} onHide={this.cancelButton}>
            <Modal.Header closeButton>
               <Modal.Title>Enter New Message</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <form onSubmit={(e) =>
                  e.preventDefault() || this.state.msgContent.length ?
                     this.close("Ok") : this.close("Cancel")}>
                  <FormGroup controlId="formBasicTextarea"
                   validationState={this.getValidationState()}>
                     <FormControl
                        componentClass="textarea"
                        type="text"
                        value={this.state.msgContent}
                        placeholder="Enter message here"
                        onChange={this.handleChange}/>
                  </FormGroup>
               </form>
            </Modal.Body>
            <Modal.Footer>
               <Button onClick={() => this.close("OK")}>OK</Button>
               <Button onClick={this.cancelButton}>Cancel</Button>
            </Modal.Footer>
         </Modal>
      );
   }
}
