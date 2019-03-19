import React, { Component } from 'react';
import { 
   ListGroup, ListGroupItem, Button, Glyphicon, Row, Col 
} from 'react-bootstrap';
import './ProfileOverview.css';
import ProfileModal from './ProfileModal';

const COL_WIDTH = 3;

export default class ProfileOverview extends Component {
   constructor(props) {
      super(props);

      this.state = {
         showModal: false,
         showConfirmation: false
      }
   }

   openModal() {
      const newState = { showModal: true };

      this.setState(newState);
   }

   modalDismiss = (result) => {
      if (result.status === "Submit") {
         this.props.modProfile(result, this.props.Prss.id, 
          this.props.Prss.password);
      }

      this.setState({ showModal: false });
   }

   renderCourses = (courses) => {
      var courseList = [];

      courses.forEach((course) => {
         courseList.push(course + " ");
      })

      return courseList;
   }

   render() {
      console.log("Rerendering ProfileOverview");

      return (
         <section className="container">
            <h1 className="name">
               {this.props.Prss.firstName} {this.props.Prss.lastName}
            </h1>
            <br/>
            <ListGroup>
               <h3><Glyphicon glyph="user"/> About</h3>
               <ListGroupItem className="row-indent">
                  <Row>
                     <Col sm={COL_WIDTH}>
                        <b>EMAIL</b>
                     </Col>
                     {this.props.Prss.email}
                  </Row>
                  <Row>
                     <Col sm={COL_WIDTH}>
                        <b>YEAR</b>
                     </Col>
                     {this.props.Prss.year}
                  </Row>
                  <Row>
                     <Col sm={COL_WIDTH}>
                        <b>COURSES</b>
                     </Col>
                     {this.renderCourses(this.props.Prss.courses)}
                  </Row>
               </ListGroupItem>
            </ListGroup>
            
            <Button 
               bsStyle="primary" 
               className="button"
               onClick={() => this.openModal()}>
               Edit Account
            </Button>
            <ProfileModal 
               showModal={this.state.showModal}
               onDismiss={this.modalDismiss}
               year={this.props.Prss.year}
               courses={this.props.Prss.courses}
            />
         </section>
      );
   }
}
