import React, { Component } from 'react';
import { Modal, Carousel, Image, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ColorPagesActions from '../../redux/actions';

export default class ResultModal extends Component {
  constructor(props) {
    super(props);
    // console.log('harr0');
    // console.log('visible pictures: ', this.props.visiblePictures);
  }



  carouselItems = this.props.visiblePictures.map((picture, idx) => (
    <Carousel.Item key={idx}>
      <Image src={`/media/alias/${picture.uuid}`}/>
      <Carousel.Caption>
        <h3>{picture.title}</h3>
      </Carousel.Caption>
    </Carousel.Item>
  ));

  handleSelect = (selectedIndex, e) =>
    this.props.actions.showModal({
        imgIdx: selectedIndex,
        direction: e.direction
      }
    );
  
  handleClick = () => this.props.actions.hideModal(false);
  
  render () {
    return (
      <Modal className="Modal-Container" show={this.props.show} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton/>
        <Modal.Body>
          <Carousel activeIndex={this.props.imgIdx} direction={this.props.direction} onSelect={this.handleSelect}>
            {this.carouselItems}
          </Carousel>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClick}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = ({modal}) => {
  // console.log("result modal state: ");
  // console.log("show: ", modal.show);
  // console.log("imgIdx: ", modal.imgIdx);
  // console.log("direction: : ", modal.direction);
  return (
    { show: modal.show, imgIdx: modal.imgIdx, direction: modal.direction }
  );
}

const mapDispatchToProps = (dispatch) => (
  { actions: bindActionCreators(ColorPagesActions, dispatch) }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultModal);
