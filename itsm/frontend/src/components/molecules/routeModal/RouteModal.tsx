import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from "react-i18next";
import "./routeModal.scss";
import { useNavigate } from "react-router-dom";

function RouteModal({ isAdmin }: any) {
  const [Modalshow, setModalShow] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isAdmin) {
      setModalShow(true);
    }
  }, [isAdmin]);
  const handleClose = () => {
    setModalShow(false);
    navigate("/dashboard")
  } 

  return (
    <>
      <Modal show={Modalshow} onHide={handleClose} className='routeModalContent'>
        <Modal.Header className='p-2'>
          <Modal.Title style={{fontSize: "20px"}}>{t("Unauthorized Access")}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{fontSize: "17px"}}>
          {t(`You do not have permission to access this page`)}
        </Modal.Body>
        <Modal.Footer className='pt-1 pb-1 pe-2'>
          <Button variant="primary" onClick={handleClose}>
            {t("Ok")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RouteModal;
