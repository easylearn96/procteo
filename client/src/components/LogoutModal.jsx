import React from "react";
import { Modal, message } from "antd";
import { useNavigate } from "react-router-dom";

const LogoutModal = ({ isVisible, onCancel }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
    window.location.reload();
  };

  return (
    <Modal
      open={isVisible}
      onCancel={onCancel}
      footer={null}
      centered
      closable={false}
      width={480}
      className="logout-modal-ai"
    >
      <div className="text-center p-5 bg-white rounded-5">
        <div className="logout-icon-ai-wrapper mb-4">
          <i className="fa-solid fa-right-from-bracket"></i>
        </div>
        
        <h2 className="fw-bold mb-3 text-dark">Confirm Logout</h2>
        <p className="text-muted mb-5 px-3">
          Are you sure you want to sign out of the healthcare portal? You will need to log in again to access your medical records and appointments.
        </p>
        
        <div className="d-grid gap-3 mb-4">
          <button className="btn btn-navy-ai py-3 rounded-3 fw-bold" onClick={handleLogout}>Logout</button>
          <button className="btn btn-cancel-ai py-3 rounded-3 fw-bold" onClick={onCancel}>Cancel</button>
        </div>
        
        <div className="pt-3 d-flex align-items-center justify-content-center text-muted small opacity-75">
           <i className="fa-solid fa-shield-check me-2"></i>
           Secure Session Management
        </div>
      </div>

      <style jsx>{`
        :global(.logout-modal-ai .ant-modal-content) {
          padding: 0 !important;
          border-radius: 24px !important;
          overflow: hidden;
        }
        .logout-icon-ai-wrapper {
          width: 85px;
          height: 85px;
          background: #fff5f5;
          color: #ff6b6b;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.2rem;
          margin: 0 auto;
        }
        .btn-navy-ai {
          background-color: #001b3d;
          color: white;
          border: none;
          font-size: 1.1rem;
        }
        .btn-navy-ai:hover {
          background-color: #002d66;
          color: white;
        }
        .btn-cancel-ai {
          background: transparent;
          border: 1px solid #ddd;
          color: #666;
          font-size: 1.1rem;
        }
        .btn-cancel-ai:hover {
          background: #f8f9fa;
        }
        .text-dark { color: #001b3d !important; }
      `}</style>
    </Modal>
  );
};

export default LogoutModal;
