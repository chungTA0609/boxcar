import React from "react";
import { Button, Modal } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
function Dialog({ title, content, onClose, onSubmit }) {
  return (
    <Modal show={true} onHide={() => onClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onClose(false)}>
          Hủy
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            onSubmit();
            onClose(true);
          }}
        >
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Dialog;
