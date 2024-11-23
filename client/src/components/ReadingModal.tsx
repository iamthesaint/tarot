import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./ReadingModal.css";

interface ReadingModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  onSave: () => void; 
}

const ReadingModal: React.FC<ReadingModalProps> = ({ isOpen, children, onClose, onSave }) => {
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
        className="reading-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button className="modal-button" onClick={onClose}>
          Close and Reset Reading
        </button>
        <button className="modal-button" onClick={onSave}>
          Save Reading & Reflection
        </button>
      </div>
    </div>,
    document.body
  );
};

export default ReadingModal;
