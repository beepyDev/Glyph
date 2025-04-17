import { useEffect } from 'react';
import styles from './AIChatOverlay.module.css';

const AIChatOverlay = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.content}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <div className={styles.chatContainer}>
          <h2>AI Assistant</h2>
          <div className={styles.messageList}>
            {/* Messages will be added here later */}
          </div>
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Type your message..."
              className={styles.input}
              // Functionality will be added later
            />
            <button className={styles.sendButton}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatOverlay;