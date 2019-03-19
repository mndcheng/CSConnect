import React, { PureComponent } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';

/**
 * Properties expected:
 * show: boolean
 * body: string
 * buttons: Array<string>
 */
export default class ConfDialog extends PureComponent {
   constructor(props) {
      super(props);
      console.log("Constructing ConfDialog w/ ", props);
   }
   close = (result) => {
      this.props.onClose(result)
   }

   render() {
      console.log("ConfDialog rerenders");
      return (
         <Modal show={this.props.show} onHide={() => this.close("Dismissed")}>
            <Modal.Header closeButton>
               <Modal.Title>{this.props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {this.props.isError ?
                  this.props.body.map((err, i) =>
                     <Alert key={i} className={"alert alert-danger"}>
                        {err}
                     </Alert>
                  )
                  :
                  this.props.body
               }
            </Modal.Body>
            <Modal.Footer>
               {this.props.buttons.map((btn, i) => <Button key={i}
                  onClick={() => this.props.onClose(btn)}>{btn}</Button>)}
            </Modal.Footer>
         </Modal>
      )
   }
}
