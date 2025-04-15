import { useEffect, useRef } from 'react';
import styles from './Modal.module.css';

export default function Modal({ isOpen, onClose, onConfirm, title, message, showCancel = true, confirmText = 'Delete', confirmButtonClass }) {
	const confirmButtonRef = useRef(null);

	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === 'Escape') onClose();
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
			confirmButtonRef.current?.focus();
			return () => document.removeEventListener('keydown', handleEscape);
		}
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div className={styles.overlay} onClick={onClose}>
			<div className={styles.modal} onClick={e => e.stopPropagation()}>
				<h2 className={styles.title}>{title}</h2>
				<p className={styles.message}>{message}</p>
				<div className={styles.buttons}>
					{showCancel && (
						<button className={styles.cancelButton} onClick={onClose}>
							Cancel
						</button>
					)}
					<button
						ref={confirmButtonRef}
						className={`${styles.confirmButton} ${confirmButtonClass || ''}`}
						onClick={onConfirm}
					>
						{confirmText}
					</button>
				</div>
			</div>
		</div>
	);
}