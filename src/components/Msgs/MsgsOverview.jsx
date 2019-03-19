import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Col, Row, Button } from 'react-bootstrap';
import MsgModal from './MsgModal';
import './MsgsOverview.css';

const COL_SIZE_1 = 8;
const COL_SIZE_2 = 16;

export default class Msgs extends Component {
   constructor(props) {
      super(props);

      this.clearAndUpdate(this.props.location.state.cnvID);
      this.state = {
         showModal: false
      };

      this.setCnv = this.modalDismiss.bind(this);
   }
   clearAndUpdate(cnvId) {
      this.props.clearMessages();
      this.props.updateMessages(cnvId);
   }
   // Open a model
   openModal = () => {
      this.setState({ showModal: true });
   }

   modalDismiss = (result) => {
      if (result.status === "OK") {
         this.addMessage(result);
      }
      this.setState({ showModal: false });
   }

   addMessage(result) {
      this.props.addMessage(
         this.props.location.state.cnvID, 
         { content: result.content, email: this.props.Prss.email },
         () => this.props.updateMessages(this.props.location.state.cnvID)
      ); 
   }

   render() {
      var otherUser = '';
      var msgItems = [];

      this.props.Cnvs.forEach((cnv) => {
         if (cnv.id.toString() === this.props.location.state.cnvID) {
            otherUser = cnv.user2;
         }
      });

      this.props.Msgs.forEach(msg => {
         if (!this.props.userOnly || this.props.Cnvs.id === msg.cnvId) 
            msgItems.push(<MsgItem
               key={msg.id}
               msgID={msg.id}
               whenAdded={msg.whenAdded.seconds * 1000}
               email={msg.email}
               content={msg.content}/>
            );
      });

      return (
         <section className="container">
            <h1>{otherUser}</h1>
            <ListGroup>{msgItems}</ListGroup>
            <Button 
               bsStyle="primary" 
               className="button"
               onClick={this.openModal}>
               New Message
            </Button>
            {/* Modal for creating msg */}
            <MsgModal
               showModal={this.state.showModal}
               onDismiss={this.setCnv} />
         </section>
      );
   }
}

// A Msg List Item
const MsgItem = function(props) {
   return (
      <ListGroupItem>
         <Row>
            <Col sm={COL_SIZE_1}>
               {props.email}
               <br></br>
               {props.content}
            </Col>
            <Col className="timestamp pull-right" sm={COL_SIZE_2}>
               {props.whenAdded ? 
                  new Intl.DateTimeFormat(['en-US'],
                     {
                        year: "numeric", month: "short", day: "numeric",
                        hour: "2-digit", minute: "2-digit", second: "2-digit"
                     })
                  .format(new Date(props.whenAdded)) : 'N/A'}
            </Col>
         </Row>
      </ListGroupItem>
   );
}
