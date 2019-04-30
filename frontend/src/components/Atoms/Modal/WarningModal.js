import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import styles from './WarningModal.module.scss'

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
      className={styles.window + " " + styles.warning}
      overlayClassName={styles.overlay}
      ariaHideApp={false}
    >
      <h2>
        {title}
      </h2>
      <p>
        {body}
      </p>
      <button type="button" onClick={onCloseModal}>
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