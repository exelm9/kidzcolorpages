import React, { PropTypes } from 'react';
import ModalHeader from '../ModalHeader/ModalHeader';
import ModalPreview from '../../components/ModalPreview';
import ModalFooter from '../ModalFooter/ModalFooter';

const Modal = (props) => (
  <div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <ModalHeader />
        <ModalPreview />
        <ModalFooter />
      </div>
    </div>
  </div>
)

export default Modal;