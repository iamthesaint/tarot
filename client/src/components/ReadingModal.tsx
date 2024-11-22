import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./ReadingModal.css";

interface ReadingModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const ReadingModal: React.FC<ReadingModalProps> = ({ isOpen, children, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button onClick={onClose}>Close and Reset Reading</button>
      </div>
    </div>,
    document.body
  );
};

export default ReadingModal;
