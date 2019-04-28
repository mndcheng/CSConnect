import React, { Component } from 'react';
import { 
   Form, FormGroup, Col, FormControl, Button
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './SignIn.css';

class SignIn extends Component {
   constructor(props) {
      super(props);

      // Current login state
      this.state = {
         email: 'admin@admin.com',
         password: 'password'
      }

      // bind 'this' to the correct context
      this.handleChange = this.handleChange.bind(this);
      this.signIn = this.signIn.bind(this);
   }

   // Call redux actionCreator signin via props.
   signIn(event) {
      this.props.signIn(
       this.state, () => this.props.history.push("/resourceOverview")
      );
      event.preventDefault();
   }

   // Continually update state as letters typed. Rerenders, but no DOM change!
   handleChange(event) {
      const newState = {}
      newState[event.target.name] = event.target.value;
      this.setState(newState);
   }

   render() {
      console.log("Rendering Signin");
      return (
         <section className="container signinContainer login-page">
            <Col>
               <h1 className="text-center">Sign In</h1>
            </Col>
            <Form className="form" horizontal>
               <FormGroup controlId="formHorizontalEmail">
                  <Col>
                     <FormControl
                        className="input"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleChange}
                     />
                  </Col>
               </FormGroup>
               <FormGroup controlId="formHorizontalPassword">
                  <Col>
                     <FormControl
                        className="input"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                     />
                  </Col>
               </FormGroup>
               <FormGroup>
                  <Col>
                     <Button
                        type="submit" 
                        className="button"
                        onClick={this.signIn}>
                        Sign in
                     </Button>
                  </Col>
               </FormGroup>
               <FormGroup className="formText">
                  <Col>
                     <p className="message">Not registered?&nbsp;
                        <Link className="makeAcc" key={1} to="/register">
                           Create an account
                        </Link>
                     </p>
                  </Col>
               </FormGroup>
            </Form>
         </section>
      )
   }
}

export default SignIn;
