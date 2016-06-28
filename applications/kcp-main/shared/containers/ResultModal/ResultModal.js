import React, { Component } from 'react';
import { Modal, Button, Col, Row } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ResultsListItem from '../../components/DefaultResult/resultsListItem';
import * as ColorPagesActions from '../../redux/actions';

export default class ResultModal extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleSelect (imgIdx) { this.props.actions.changeImage(imgIdx); }

  handleClose () { this.props.actions.hideModal(false); }
  
  render () {
    console.log(this.props.aliases);
    const galleryItems = this.props.aliases.map((alias, idx, arr) => {
      console.log(arr);
      return (
        <ResultsListItem 
          image={`/media/alias/${alias}`} 
          idx={idx} 
          showImage={this.handleSelect} 
          selected={idx === this.props.imgIdx}/>
      );
    });

    return (
      <Modal className="Modal-Container" show={this.props.show} onHide={this.handleClose} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton={true} onHide={this.handleClose}/>
        <Modal.Body>
          <Row>
            <Col md={6} className="preview">
              <figure>
                <img className='modalLrgImage' src={`/media/alias/${this.props.aliases[this.props.imgIdx]}`} alt="" />
              </figure>
            </Col>
            <Col md={6} className="more">
              <div className='galleryWrap'>
                {galleryItems}
              </div>
              <div className='modalButtonsWrap'>
                <button
                  className={'modalButtons btn btn-primary'}
                >Print</button>
                <button
                  className={'modalButtons btn btn-primary'}
                >Pin</button>
              </div>
            </Col>
          </Row>

        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = ({modal}) => {
  console.log(modal)
  return (
    { show: modal.show, aliases: modal.aliases, imgIdx: modal.imgIdx, colIdx: modal.colIdx }
  );
}

const mapDispatchToProps = (dispatch) => (
  { actions: bindActionCreators(ColorPagesActions, dispatch) }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultModal);
