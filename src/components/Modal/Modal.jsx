import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { ModalElement, ModalOverlay } from './Modal.styled';

export const Modal = ({ bigImage, closeModal }) => {
  useEffect(() => {
    const handlePressESC = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', handlePressESC);
    return () => document.removeEventListener('keydown', handlePressESC);
  }, [closeModal]);

  return (
    <ModalOverlay onClick={closeModal}>
      <ModalElement>
        <img src={bigImage} alt="Modal" width="960px" />
      </ModalElement>
    </ModalOverlay>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  bigImage: PropTypes.string.isRequired,
};
