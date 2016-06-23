import React, { Component, PropTypes } from 'react';
import { Modal, Carousel, Image, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ModalActions } from '../../redux/actions';

class ResultModal extends Component {
  const me = this;

  const carouselItems = results.map((result) => (
    <Carousel.Item>
      <Image src={result.imageUrl} />
      <Carousel.Caption>
        <h3>{result.displayName}</h3>
      </Carousel.Caption>
    </Carousel.Item>
  ));

  const handleSelect = (selectedIndex, e) =>
    me.setState({
      imgIdx: selectedIndex,
      direction: e.direction
    }
  );

  render () {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton />
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

const mapStateToProps = (state) => ({
    results: state.results,
    imgIdx: state.imgIdx,
    direction: state.direction
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(ModalActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResultModal);

export default ResultModal;