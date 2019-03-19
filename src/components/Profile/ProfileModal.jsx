import React, { Component } from 'react';
import {
   Modal, Button, FormControl, ControlLabel, FormGroup, HelpBlock, Alert
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

export default class ProfileModal extends Component {
   constructor(props) {
      super(props);

      this.state = {
         year: this.props.year || '',
         courses: this.getCourses(this.props.courses) || [],
         oldPwd: '',
         newPwd: '',
         newPwdRpt: ''
      }

      this.handleChange = this.handleChange.bind(this);
   }

   getCourses = (courses) => {
      var courseList = [];
      if (courses) {
         courses.forEach(function(course){
            courseList.push(course.replace(/[, ]+/g, ""));
         });
      }

      return courseList.toString();
   }

   close = (result) => {
      this.props.onDismiss && this.props.onDismiss({
         status: result,
         year: this.state.year,
         courses: this.state.courses.split(','),
         oldPwd: this.state.oldPwd,
         newPwd: this.state.newPwd,
         newPwdRpt: this.state.newPwdRpt
      });

      this.setState({ oldPwd: '', newPwd: '', newPwdRpt: '' });
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
               <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <form>
                  <FieldGroup 
                     id="year" 
                     type="text" 
                     label="Year"
                     placeholder="Enter year" 
                     value={this.state.year}
                     onChange={this.handleChange} 
                     required={false} />
                  <FieldGroup 
                     id="courses" 
                     type="text" 
                     label="Courses"
                     placeholder="Enter your current course(s) separated by a comma" 
                     value={this.state.courses}
                     onChange={this.handleChange} 
                     required={false} />
                  <FieldGroup 
                     id="oldPwd" 
                     type="password" 
                     label="Old Password"
                     placeholder="Enter old password" 
                     value={this.state.oldPwd}
                     onChange={this.handleChange} 
                     required={false} />
                  <FieldGroup 
                     id="newPwd" 
                     type="password" 
                     label="New Password"
                     placeholder="Enter new password" 
                     value={this.state.newPwd}
                     onChange={this.handleChange} 
                     required={false} />
                  <FieldGroup 
                     id="newPwdRpt" 
                     type="password" 
                     label="Repeat New Password"
                     placeholder="Enter new password" 
                     value={this.state.newPwdRpt}
                     onChange={this.handleChange} 
                     required={false} />
               </form>

            {this.state.newPwd!== this.state.newPwdRpt ?
            <Alert bsStyle="warning">
               Passwords don't match
            </Alert> : ''}
            </Modal.Body>
            <Modal.Footer>
               <Button onClick={() => this.close("Submit")}>Submit</Button>
               <Button onClick={() => this.close("Cancel")}>Cancel</Button> 
            </Modal.Footer> 
         </Modal>
      )
   }
} 