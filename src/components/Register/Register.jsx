import React, { Component } from 'react';
import {
   Form, FormGroup, Col, FormControl, Checkbox, Button, Alert
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ConfDialog } from '../index';
import './Register.css';

class Register extends Component {
   constructor(props) {
      super(props);
      this.ADMIN = 1
      this.STUDENT = 0

      this.state = {
         firstName: '',
         lastName: '',
         email: '',
         password: '',
         passwordTwo: '',
         year: '',
         courses: [],
         termsAccepted: false,
         role: this.STUDENT
      }

      this.handleChange = this.handleChange.bind(this);
   }

   submit() {
      let { // Make a copy of the relevant values in current state
         firstName,
         lastName,
         email,
         password,
         year,
         courses,
         termsAccepted,
         role
      } = this.state;

      const user = {
         firstName,
         lastName,
         email,
         password,
         year,
         courses,
         termsAccepted,
         role
      };

      user.role = user.role ? this.ADMIN : this.STUDENT;
      this.props.register(user, () => { this.setState({ offerSignIn: true }) });
   }

   handleChange(ev) {
      let newState = {};

      if (ev.target.type === 'checkbox')
         newState[ev.target.name] = ev.target.checked;
      else if (ev.target.id === 'courses')
         newState[ev.target.name] = ev.target.value.split(',');
      else
         newState[ev.target.name] = ev.target.value;

      this.setState(newState);
   }

   formValid() {
      let s = this.state;

      return s.email && s.password && s.password === s.passwordTwo
         && s.termsAccepted && s.lastName;
   }

   isAdmin() {
      return this.props.Prss.role === this.ADMIN;
   }

   render() {
      return (
         <section className="container registerContainer login-page">
            <Col>
               <h1 className="text-center">Register</h1>
            </Col>
            <Form className="form" horizontal>
               <FormGroup controlId="formHorizontalEmail">
                  <Col>
                     <FormControl className="input" type="email" name="email"
                        placeholder="Enter email*" value={this.state.email} 
                        onChange={this.handleChange} required={true}
                     />
                  </Col>
               </FormGroup>
               <FormGroup controlId="formHorizontalFirstName">
                  <Col>
                     <FormControl className="input" type="text" name="firstName"
                        placeholder="Enter first name" value={this.state.firstName}
                        onChange={this.handleChange}
                     />
                  </Col>
               </FormGroup>
               <FormGroup controlId="formHorizontalLastName">
                  <Col>
                     <FormControl className="input" type="text" name="lastName"
                        placeholder="Enter last name*" value={this.state.lastName}
                        onChange={this.handleChange} required={true}
                     />
                  </Col>
               </FormGroup>
               <FormGroup controlId="formHorizontalYear">
                  <Col>
                     <FormControl className="input" type="text" name="year"
                        placeholder="Enter your year" value={this.state.year}
                        onChange={this.handleChange}
                     />
                  </Col>
               </FormGroup>
               <FormGroup controlId="formHorizontalCourses">
                  <Col>
                     <FormControl className="input" type="text" name="courses" 
                        placeholder="Course(s): CSC101, CPE315..." 
                        value={this.state.courses} onChange={this.handleChange}
                     />
                  </Col>
               </FormGroup>
               <FormGroup controlId="formHorizontalPassword">
                  <Col>
                     <FormControl className="input" type="password" name="password"
                        placeholder="Password*" value={this.state.password}
                        onChange={this.handleChange} required={true}
                     />
                  </Col>
               </FormGroup>
               <FormGroup controlId="formHorizontalPassword2">
                  <Col>
                     <FormControl className="input" type="password" name="passwordTwo"
                        placeholder="Repeat Password*" value={this.state.passwordTwo}
                        onChange={this.handleChange} required={true}
                     />
                  </Col>
               </FormGroup>
               <FormGroup>
                  <Checkbox name="termsAccepted" value={this.state.termsAccepted}
                     onChange={this.handleChange} className="text-left">
                     Do you accept the terms and conditions?
                  </Checkbox>
                  <Checkbox name="role" value={this.state.role}
                     onChange={this.handleChange} className="text-left">
                     Admin
                  </Checkbox>
               </FormGroup>
              {this.state.password !== this.state.passwordTwo ?
               <Alert bsStyle="warning">
                  Passwords don't match
               </Alert> : ''}
              <FormGroup>
                  <Col>
                     <Button
                        bsStyle="primary"
                        className="button"
                        onClick={() => this.submit()}
                        disabled={!this.formValid()}>
                        Submit
                     </Button>
                  </Col>
               </FormGroup>
               <FormGroup className="formText">
                  <Col>
                     <p className="message">Already registered?&nbsp;
                        <Link className="makeAcc" key={1} to="/signin">
                           Sign In
                        </Link>
                     </p>
                  </Col>
               </FormGroup>
            </Form>
            <ConfDialog
               show={this.state.offerSignIn}
               title="Registration Success"
               body={`Would you like to log in as ${this.state.email}?`}
               buttons={['YES', 'NO']}
               onClose={answer => {
                  this.setState({ offerSignIn: false });
                  if (answer === 'YES') {
                     this.props.signIn(
                        { 
                           email: this.state.email, 
                           password: this.state.password 
                        },
                        () => this.props.history.push("/")
                     );
                  }
               }
               }
            />
         </section>
      )
   }
}

export default Register;
