import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { 
   ListGroup, ListGroupItem, Col, Row, Button 
} from 'react-bootstrap';
import CnvModal from './CnvModal';
import './CnvOverview.css';

const COL_SIZE_1 = 8;
const COL_SIZE_2 = 16;
const NEGATIVE_CONST = -1;
const POSITIVE_CONST = 1;

export default class CnvOverview extends Component {
   constructor(props) {
      super(props);
      this.clearAndUpdate();
      this.state = {
         showModal: false,
         showConfirmation: false,
         editCnv: false,
      };

      this.setCnv = this.modalDismiss.bind(this);
   }

   clearAndUpdate() {
      this.props.clearConversations();
      this.props.updateConversations(this.props.Prss.email);
   }

   // Open a model with a |cnv| (optional)
   openModal = (cnv) => {
      const newState = { showModal: true };
      if (cnv.id) {
         newState.editCnv = true;
         newState.cnv = cnv;
      } else {
         newState.editCnv = false;
         newState.cnv = null;
      }
      this.setState(newState);
   }

   modalDismiss = (result) => {
      if (result.status === "OK") {
         this.state.editCnv ? 
          this.modCnv(result) : 
          this.addConversation(result);
      }
      this.setState({ showModal: false, editCnv: null });
   }

   modCnv(result) {
      this.props.modCnv(this.state.cnv.id, result.title, 
       () => this.props.updateConversations(this.props.Prss.id));
   }

   addConversation(result) {
      this.props.addConversation({
       user1: this.props.Prss.email, 
       user2: result.recipient 
      }, 
       () => this.props.updateConversations(this.props.Prss.email));
   }

   render() {
      var cnvItems = [];

      this.props.Cnvs.forEach(cnv => {
         cnvItems.push(<CnvItem
            key={cnv && cnv.id}
            cnv={cnv}
            thisPrsEmail={this.props.Prss.email}
            />);
      });

      cnvItems.sort((cnv1, cnv2) => {
         if (!cnv1.props.cnv.lastMessage || !cnv2.props.cnv.lastMessage)
            return cnv1.props.cnv.lastMessage ? NEGATIVE_CONST : POSITIVE_CONST;
         return cnv2.props.cnv.lastMessage.seconds - 
          cnv1.props.cnv.lastMessage.seconds;
      });

      return (
         <section className="container">
            <h1>My Conversations</h1>
            <ListGroup>{cnvItems}</ListGroup>
            <Button 
               bsStyle="primary" 
               className="button"
               onClick={this.openModal}>
               New Conversation
            </Button>
            {/* Modal for creating and changing cnv */}
            <CnvModal
               showModal={this.state.showModal}
               title="New Conversation"
               cnv={this.state.cnv}
               onDismiss={this.setCnv} />
         </section>
      );
   }
}

// A Cnv List Item
const CnvItem = function(props) {
   return (
      <ListGroupItem>
         <Row>
            <Col sm={COL_SIZE_1}>
               <Link className="userCnv" to={{
                  pathname: "/msg/" + props.cnv.id,
                  state: {
                     cnvID: props.cnv.id
                  }
               }}>
                  {props.cnv.user1 === props.thisPrsEmail ? 
                   props.cnv.user2 : props.cnv.user1}
               </Link>
            </Col>
            <Col className="timestamp pull-right" sm={COL_SIZE_2}>
               {props.cnv.lastMessage ? new Intl.DateTimeFormat(['en-US'],
                  {
                     year: "numeric", month: "short", day: "numeric",
                     hour: "2-digit", minute: "2-digit", second: "2-digit"
                  })
                  .format(new Date(props.cnv.lastMessage.seconds * 1000)) : 'N/A'}
            </Col>
         </Row>
      </ListGroupItem>
   );
}
