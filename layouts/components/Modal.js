import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { BiFilter } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { CustomButton } from "./CustomButton";

export const CongratulationsModal = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({});

  //   const handleIndustryCategoryChange = (e) => {
  //     setState({ name: e.target.value });
  //   };

  const submitModal = () => {
    props.setModalShow(false);
  };

  //   const industryCategoryDelete = () => {
  //     dispatch(industryCategoryActions?.deleteCategory(props.action));
  //     props.setModalShow(false);
  //   };
  const cancelModal = () => {
    props.setModalShow(false);
  };
  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            <div className="d-flex justify-content-center fw-bold">
              <h3> Congratulations!! </h3>
            </div>
            <h5>
              Based on information provided there are 2 subsidies applicable to
              you.
            </h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          For more details would you like to proceed further?
        </Modal.Body>
        <Modal.Footer>
          <>
            <CustomButton
              name="Yes"
              color="#FFFFFF"
              bgColor="#FA6130"
              onClick={() => submitModal()}
            />
            <CustomButton
              name="No"
              color="#000000"
              bgColor="#FFFFFF"
              border="1px solid #000000"
              onClick={() => cancelModal()}
            />
          </>
        </Modal.Footer>
      </Modal>
    </>
  );
};
