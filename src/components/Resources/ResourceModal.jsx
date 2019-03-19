import React, { Component } from 'react';
import {
   Modal, Button, FormControl, ControlLabel, FormGroup, HelpBlock
} from 'react-bootstrap';

function FieldGroup({id, label, help, ...props }) {
   return (
      <FormGroup controlId={id}>
         <ControlLabel>{label}</ControlLabel>
         <FormControl {...props} />
         {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
   );
}

export default class ResourceModal extends Component {
   constructor(props) {
      super(props);
      this.state = {
         title: '',
         link: ''
      }

      this.handleChange = this.handleChange.bind(this);
   }

   close = (result) => {
      this.props.onDismiss && this.props.onDismiss({
         status: result,
         title: this.state.title,
         link: this.state.link
      });
   }

   getValidationState = () => {
      if (this.state.title && this.state.link) {
         return null
      }
      return "warning";
   }

   handleChange = (event) => {
      let newState = {};

      newState[event.target.id] = event.target.value;

      this.setState(newState);
   }

   render() {
      return (
         <Modal show={this.props.showModal} 
          onHide={() => this.close("Cancel")}>
            <Modal.Header closeButton>
               <Modal.Title>Add a New Resource</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <form>
                  <FieldGroup 
                     id="title" 
                     type="text" 
                     label="Resource Title"
                     placeholder="Enter title" 
                     value={this.state.title}
                     onChange={this.handleChange} 
                     required={true} />
                  <FieldGroup 
                     id="link" 
                     type="text" 
                     label="Resource Link"
                     placeholder="Enter link" 
                     value={this.state.link}
                     onChange={this.handleChange}
                     required={true} />
               </form>
            </Modal.Body>
            <Modal.Footer>
               <Button 
                  disabled={this.getValidationState() ? true : false} 
                  onClick={() => this.close("Submit")}>
                  Submit
               </Button>
               <Button onClick={() => this.close("Cancel")}>Cancel</Button> 
            </Modal.Footer> 
         </Modal>
      )
   }
} 