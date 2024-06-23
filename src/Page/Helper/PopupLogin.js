import React from "react";
import { Modal } from "react-bootstrap";
import { getAuthToken } from "../../Redux/action";
import { useDispatch } from "react-redux";

function PopupLogin(props) {
    const  dispatch = useDispatch()
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} centered closeButton>
        <Modal.Body className="text-center">
          <img
            src={process.env.PUBLIC_URL + "/tmDb-logo.jpg"}
            alt="TMDB Logo"
            style={{ width: "100%" }}
          />
          <div className="mt-2">
            <p style={{cursor:'pointer'}} onClick={() => {
                dispatch(getAuthToken())
                .then((res) => {
                    window.location.reload()
                })
            }}>Login with TMDB</p>
          </div>
        </Modal.Body>
      </Modal>
      <div className={props.show ? "blur-background" : ""} />
    </>
  );
}

export default PopupLogin;
