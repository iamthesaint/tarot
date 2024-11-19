// client/src/components/Modal.tsx

interface ReadingModal {
    children: React.ReactNode;
    onClose: () => void;
}

const ReadingModal: React.FC<ReadingModal> = ({ children, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <div className="modal-buttons">
          <button onClick={onClose} className="modal-exit">
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadingModal;


