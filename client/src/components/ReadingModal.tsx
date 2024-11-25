import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./ReadingModal.css";

interface ReadingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  children: React.ReactNode;
}

const ReadingModal: React.FC<ReadingModalProps> = ({ isOpen, onClose, onSave, children }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
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
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
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