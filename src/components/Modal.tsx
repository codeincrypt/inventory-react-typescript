import React from 'react';
import { Modal } from 'react-bootstrap';

interface ModalComp {
  show: any, onHide: any, title: any, body: any, footer: any
}

const CustomModal = ({ show, onHide, title, body, footer }: ModalComp) => {
  return (
    <Modal show={show} centered onHide={onHide}>
      <Modal.Body className="p-5">
        <div className='mb-3'>
          <h4>{title}</h4>
        </div>
        <div>
          {body}
        </div>
        <div className='text-right mt-4'>{footer}</div>
      </Modal.Body>
    </Modal>
  );
};

export default CustomModal;
