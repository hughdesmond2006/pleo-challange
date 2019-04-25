import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import './WarningModal.scss'

// TODO styling, background, cleanup CSS
const WarningModal = ({
  modalOpen,
  onCloseModal,
  title,
  body,
}) => {
  return (
    <Modal
      isOpen={modalOpen}
      contentLabel="Modal"
      shouldCloseOnOverlayClick={true}
      className="modalWindow warningModal"
      overlayClassName="modalWindowOverlay"
      ariaHideApp={false}
    >
      <h2>
        {title}
      </h2>
      <p>
        {body}
      </p>
      <button type="button" className="" onClick={onCloseModal}>
        Got it
      </button>
    </Modal>
  );
};

WarningModal.defaultProps = {};

WarningModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default WarningModal;