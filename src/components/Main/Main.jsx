import React, { Component } from 'react';
import {
   Register, SignIn, ConfDialog, ResourceOverview, ProfileOverview,
   CnvOverview, MsgsOverview
} from '../index'
import { Route, Redirect, Switch } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './Main.css';

var ProtectedRoute = ({ component: Cmp, path, ...rest }) => {
   return (<Route path={path} render={(props) => {
      return Object.keys(rest.Prss).length !== 0 ?
         <Cmp {...rest} /> : <Redirect to='/signin' />;
   }} />);
};

class Main extends Component {
   signedIn() {
      return Object.keys(this.props.Prss).length !== 0; // Nonempty Prss obj
   }

   resetErrors() {
      this.props.clearErrs();
      this.setState({});
   }

   isAdmin() {
      return this.props.Prss.role === 1;
   }

   // Function component to generate a Route tag with a render method 
   // conditional on login.  Params {conditional: Cmp to render if signed in}

   render() {
      console.log("Redrawing main");
      console.log(this.props);
      return (
         <div>
            <div>
               <Navbar className="navigation">
                  <Navbar.Toggle />
                  <Navbar.Collapse>
                     <Nav>
                        {this.signedIn() ?
                           [
                              <LinkContainer key={"home"} to="/resourceOverview">
                                 <NavItem className="cpConnect">Cal Poly Connect</NavItem>
                              </LinkContainer>,
                              <LinkContainer
                                 key={"rsrc"}
                                 to="/resourceOverview">
                                 <NavItem>Resources</NavItem>
                              </LinkContainer>,
                              <LinkContainer key={"cnvs"} to="/myConversations">
                                 <NavItem>My Conversations</NavItem>
                              </LinkContainer>
                           ]
                           :
                           [
                              <LinkContainer key={"home"} to="/signin">
                                 <NavItem className="cpConnect">Cal Poly Connect</NavItem>
                              </LinkContainer>
                           ]
                        }
                     </Nav>
                     {this.signedIn() ?
                        [
                           <Nav pullRight key="signoutNavItem">
                              <LinkContainer key={"acc"} to="/profile">
                                 <NavItem>
                                    {`Hi, ${this.props.Prss.firstName}!`}
                                 </NavItem>
                              </LinkContainer>
                              <LinkContainer key={"signout"} to="/signin">
                                 <NavItem eventKey={"signout"}
                                    onClick={() => this.props.signOut()}>
                                    Sign out
                                 </NavItem>
                              </LinkContainer>
                           </Nav>
                        ]
                        :
                        []
                     }
                     {this.signedIn() && this.isAdmin() ?
                        [
                           <Nav pullRight key="adminRegisterNavItem">
                              <LinkContainer key={"adminRegister"} to="/register">
                                 <NavItem eventKey={0}>
                                    Register
                                 </NavItem>
                              </LinkContainer>
                           </Nav>
                        ]
                        :
                        []
                     }
                  </Navbar.Collapse>
               </Navbar>
            </div>

            {/*Alternate pages beneath navbar, based on current route*/}
            <Switch>
               <Route exact path='/'
                  component={() => this.props.Prss ?
                   <Redirect to="/resourceOverview" /> 
                   : 
                   <Redirect to="/signin" />} />
               <Route path='/signin'
                  render={() => <SignIn {...this.props} />} />
               <Route path='/register'
                  render={() => <Register {...this.props} />} />
               <ProtectedRoute path='/resourceOverview'
                  component={ResourceOverview} {...this.props} />
               <ProtectedRoute path='/myConversations'
                  component={CnvOverview} {...this.props} />
               <ProtectedRoute path='/profile'
                  component={ProfileOverview} {...this.props} />
               <ProtectedRoute path='/msg/'
                  component={MsgsOverview} {...this.props} />
            </Switch>

            {/*Error popup dialog*/}
            {this.props.Errs.length ?
               <ConfDialog
                  show={true}
                  isError={true}
                  title="Error Notice"
                  body={this.props.Errs}
                  buttons={["OK"]}
                  onClose={() => this.resetErrors()}
               />
               :
               ''
            }
         </div>
      )
   }
}

export default Main;
