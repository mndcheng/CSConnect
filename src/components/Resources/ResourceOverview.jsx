import React, { Component } from 'react';
import {
   ListGroup, ListGroupItem, Col, Row, Button
} from 'react-bootstrap';
import { ConfDialog } from '../index';
import './ResourceOverview.css';
import ResourceModal from './ResourceModal';

const COL_SIZE = 12;

export default class ResourceOverview extends Component {
   constructor(props) {
      super(props);

      if (this.props.Prss.role)
         this.props.updateAdminResources();
      else
         this.props.updateResources();

      this.state = {
         showModal: false,
         showConfirmation: false
      }

   }

   openModal = () => {
      const newState = { showModal: true };

      this.setState(newState);
   }

   linkClicked(resourceId, numClicks) {
      this.props.addClick(numClicks, { resourceId, userId: this.props.Prss.id });

      if (this.props.Prss.role)
         this.props.updateAdminResources();
      else
         this.props.updateResources();
   }

   modalDismiss = (result) => {
      if (result.status === "Submit") {
         this.props.addResource({
            link: result.link,
            title: result.title,
            numClicks: 0
         });
      }

      this.setState({ showModal: false });
   }

   toggleDisplay = (resource) => {
      this.props.modResource(resource);
   }

   render() {
      console.log("Rerendering ResourceOverview");

      return (
         <section className="container">
            <h1>Resources</h1>
            <div id="mainContent" className="gridContainer" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '10px', gridAutoRows: 'minMax(100px, auto)' }}>
               {this.props.Resources.map((resource) => (
                  <RsrcItem
                     key={resource.id || "1"}
                     resource={resource}
                     link={resource.link}
                     title={resource.title}
                     clicked={this.linkClicked.bind(this)}
                     role={this.props.Prss.role}
                     show={resource.show}
                     toggleDisplay={() => this.toggleDisplay(resource)}
                  />
               ))}
            </div>
            {this.props.Prss.role ?
               <Button
                  bsStyle="primary"
                  className="button"
                  onClick={() => this.openModal()}>
                  Add Resource
               </Button>
               : ""}
            <ResourceModal
               showModal={this.state.showModal}
               onDismiss={this.modalDismiss}
            />
            <ConfDialog
               show={this.state.showConfirmation}
               title="Delete Resource"
               body={`Would you like to delete "${this.state.delRsrc}" ?`}
               buttons={['Yes', 'No']}
               onClose={this.closeConfirmation}
            />
         </section>
      );
   }
}

// A Resource list item
const RsrcItem = function (props) {
   return (
      <ListGroupItem className="resourceItems">
            <Row>
               <Col sm={COL_SIZE} className="resourceTitles">
                  <a
                  className="resourceLink"
                  href={props.link}
                  target="_blank"
                  onClick={() =>
                   props.clicked(props.resource.id, props.resource.numClicks)}>
                  {props.title}
                  </a>
               </Col>
               <div className="hits">Hits: {props.resource.numClicks}</div>
               {props.role ?
                  <div className="pull-right">
                     {props.show ?
                        <Button
                           bsStyle="danger"
                           bsSize="small"
                           onClick={props.toggleDisplay}>
                           Hide
                     </Button>
                        :
                        <Button
                           bsStyle="primary"
                           bsSize="small"
                           onClick={props.toggleDisplay}>
                           Show
                     </Button>
                     }
                  </div>
                  : ""}

            </Row>
      </ListGroupItem>
   );
}
