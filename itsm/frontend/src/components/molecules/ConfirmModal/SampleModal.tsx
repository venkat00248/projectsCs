import React, { useState } from "react";
import { Button } from "react-bootstrap";
import CustomModal from "./CustomModal";

const SampleModal = () => {
  const [showModal, setShowModal] = useState(true);

//   const handleOpenModal = () => {
//     setShowModal(true);
//   };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {/* <button onClick={handleOpenModal}>Open Modal</button> */}
      <CustomModal
        show={showModal}
        onHide={handleCloseModal}
        title="Example Modal"
        footer={
          <>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </>
        }
      >
        <p>Modal Content</p>
      </CustomModal>
    </div>
  );
};

export default SampleModal;
