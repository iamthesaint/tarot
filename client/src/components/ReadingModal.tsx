// client/src/components/ReadingModal.tsx
import "./ReadingModal.css";

interface ReadingModal {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

const ReadingModal: React.FC<ReadingModal> = ({ children, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        </div>
      </div>
  );
};

export default ReadingModal;
