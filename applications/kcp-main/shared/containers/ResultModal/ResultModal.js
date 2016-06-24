import React, { Component, PropTypes } from 'react';
import { Modal, Carousel, Image, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showModal } from '../../redux/actions';

export default class ResultModal extends Component {
  constructor() {
    
  }
  const carouselItems = results.map((result) => (
    <Carousel.Item>
      <Image src={`/media/alias/${result.uuid}`}/>
      <Carousel.Caption>
        <h3>{result.title}</h3>
      </Carousel.Caption>
    </Carousel.Item>
  ));

  const handleSelect = (selectedIndex, e) =>
    showModal({
        imgIdx: selectedIndex,
        direction: e.direction
      }
    );

  render () {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton/>
        <Modal.Body>
          <Carousel activeIndex={this.props.imgIdx} direction={this.props.direction} onSelect={this.handleSelect}>
            {carouselItems}
          </Carousel>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = ({results, imgIdx, direction}) => ({
  results,
  imgIdx,
  direction
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ModalActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultModal);
