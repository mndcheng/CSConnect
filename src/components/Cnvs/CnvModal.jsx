import React, { Component } from 'react';
import {
   Modal, Button, FormControl, ControlLabel, FormGroup, HelpBlock
} from 'react-bootstrap';

export default class CnvModal extends Component {
   constructor(props) {
      super(props);
      this.state = {
         recipient: ''
      }

      this.cancelButton = this.close.bind(this, "Cancel");
      this.handleChange = this.handleChange.bind(this);
   }

   close = (result) => {
      this.props.onDismiss && this.props.onDismiss({
         status: result,
         recipient: this.state.recipient
      });
   }

   getValidationState = () => {
      if (this.state.recipient) {
         return null
      }
      return "warning";
   }

   handleChange = (event) => {
      this.setState({ recipient: event.target.value });
   }

   componentWillReceiveProps = (nextProps) => {
      if (nextProps.showModal) {
         this.setState({ 
            recipient: (nextProps.cnv && nextProps.cnv.recipient) || ''
         });
      }
   }

   render() {
      return (
         <Modal show={this.props.showModal} onHide={this.cancelButton}>
            <Modal.Header closeButton>
               <Modal.Title>{this.props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <form onSubmit={(e) =>
                  e.preventDefault() || this.state.recipient.length ?
                     this.close("Ok") : this.close("Cancel")}>
                  <FormGroup controlId="formBasicText"
                   validationState={this.getValidationState()}>
                     <ControlLabel>Send A Message To:</ControlLabel>
                     <FormControl
                        type="text"
                        value={this.state.recipient}
                        placeholder="Enter recipient email"
                        onChange={this.handleChange}/>
                     <FormControl.Feedback />
                     <HelpBlock>Must enter valid recipient email.</HelpBlock>
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
