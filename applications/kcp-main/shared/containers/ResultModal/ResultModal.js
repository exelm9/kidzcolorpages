import React, { Component } from 'react';
import { Modal, Carousel, Image, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ResultsListItem from './resultsListItem';
import * as ColorPagesActions from '../../redux/actions';

export default class ResultModal extends Component {
  constructor(props) {
    super(props);
  }

  galleryItems = this.props.aliases.map((alias, idx) => (
    <a href={`/media/alias/${galleryItems[idx]}`} key={galleryItems[idx]} idx={idx}>
      <figure>
        <img src={`/media/alias/${galleryItems[idx]}`} alt="" />
      </figure>
    </a>
  ));

  handleSelect = (selectedIndex, e) =>
    this.props.actions.showModal({
        imgIdx: selectedIndex
      }
    );
  
  handleClick = () => this.props.actions.hideModal(false);
  
  render () {
    return (
      <Modal className="Modal-Container" show={this.props.show} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton/>
        <Modal.Body>
          <Col md={6} >
            <a handleSelect={`/media/alias/${galleryItems[this.props.idx]}`} key={0}>
              <figure>
                <img src={`/media/alias/${galleryItems[this.props.idx]}`} alt="" />
              </figure>
            </a>
          </Col>
          <Col md={6} >
            <div>
              {galleryItems}
            </div>
          </Col>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClick}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = ({modal}) => {
  return (
    { show: modal.show, imgIdx: modal.imgIdx, colIdx: modal.colIdx }
  );
}

const mapDispatchToProps = (dispatch) => (
  { actions: bindActionCreators(ColorPagesActions, dispatch) }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultModal);
