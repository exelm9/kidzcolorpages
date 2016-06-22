import React, { Component, PropTypes } from 'react';
import { Modal, Carousel, Image, Button } from 'react-bootstrap';

class ResultModal extends Component {
    const results = props.results;
    let current = props.current;

    const getInitialState = () => {
        return {index: 0, direction: null};
    };

    const carouselItems = results.map((result) =>
        <Carousel.Item>
            <Image src={result.imageUrl}></Image>
            <Carousel.Caption>
                <h3>{result.displayName}</h3>
            </Carousel.Caption>
        </Carousel.Item>
    );

    function handleSelect(selectedIndex, e) {
        this.setState({
            index: selectedIndex,
            direction: e.direction
        });
    }
    return (
        <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
            <Modal.Header closeButton />
            <Modal.Body>
                <Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect}>
                    {carouselItems}
                </Carousel>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );

}

export default ResultModal;