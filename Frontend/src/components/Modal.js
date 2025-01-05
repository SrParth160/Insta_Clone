import React, { useContext } from "react";
import { RiCloseLine } from "react-icons/ri";
import "../components/Modal.css";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/loginContext";

export default function Modal( ) {
    const { setModalOpen } = useContext(LoginContext );  
  const navigate = useNavigate();
  const Logoutdata = () =>{
    setModalOpen(false);
    localStorage.clear();
    navigate("/login");
  }
  return (
    <div className="darkBg" onClick={() => setModalOpen(false)}>
      <div className="centered">
        <div className="modal">
          {/* modal header */}
          <div className="modalHeader">
            <h5 className="heading">Confirm</h5>
          </div>
          <button className="closeBtn" onClick={() => setModalOpen(false)}>
            <RiCloseLine></RiCloseLine>
          </button>
          {/* modal content */}
          <div className="modalContent">Are you really want to log Out ?</div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button
                className="logOutBtn"
                onClick={() => Logoutdata()}
              >
                Log Out
              </button>

              <button className="cancelBtn" onClick={() => setModalOpen(false)}>
                cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
