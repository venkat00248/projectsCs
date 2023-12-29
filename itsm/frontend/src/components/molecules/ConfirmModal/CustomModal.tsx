import React from "react";
import { Modal } from "react-bootstrap";
import "./CustomModal.scss";
import { useSelector } from "react-redux";

interface Props {
  show: boolean;
  onHide: () => void;
  title: string;
  footer?: JSX.Element;
  children:any
}

const CustomModal: React.FC<Props> = ({ show, onHide, title, footer, children }) => {
  const theme = useSelector((state: any) => state.allReducers.theme.theme);
  return (
    <Modal show={show} onHide={onHide} dialogClassName={`custom-modal ${theme?"searchBarDarkTheme":""}`}>
      <Modal.Header closeButton className="headerModal">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="BodyModal">{children}</Modal.Body>
      {footer && <Modal.Footer className="footerModal">{footer}</Modal.Footer>}
    </Modal>
  );
};

export default CustomModal;
