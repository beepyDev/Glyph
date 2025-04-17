import { useState } from "react";
import styles from "./NoteList.module.css";
import ThemeToggle from "./ThemeToggle";
import Modal from "./Modal";
import { useSidebar } from "../context/SidebarContext";

const NoteList = ({
	notes,
	activeNote,
	onNoteSelect,
	onNewNote,
	onDeleteNote,
	onToggleAiOverlay,
}) => {
	const [deleteModal, setDeleteModal] = useState({
		isOpen: false,
		noteId: null,
	});
	const { isCollapsed, toggleSidebar } = useSidebar();

	return (
		<div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
			<div className={styles.sidebarHeader}>
				<div className={styles.headerLeft}>
					<img src="/Glyph.svg" style={{ height: "2em" }} />
					<h2>Glyph</h2>
					<ThemeToggle />
				</div>
				<div className={styles.headerRight}>
					<button onClick={onNewNote} className={styles.newButton}>
						+ New Note
					</button>
					<button
						onClick={() => onToggleAiOverlay(prev => !prev)}
						className={styles.aiButton}
						title="AI Assistant"
					>
						<svg viewBox="0 0 24 24" width="24" height="24">
							<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
						</svg>
					</button>
					<button 
						onClick={toggleSidebar} 
						className={`${styles.collapseButton} ${isCollapsed ? styles.collapsed : ''}`}
						title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
					>
						<svg viewBox="0 0 24 24" width="24" height="24">
							<path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
						</svg>
					</button>
				</div>
			</div>
			<div className={styles.noteList}>
				{notes.map((note) => (
					<div
						key={note.id}
						className={`${styles.noteItem} ${
							note.id === activeNote ? styles.active : ""
						}`}
						onClick={() => onNoteSelect(note.id)}
						tabIndex={"0"}
						onKeyUp={(e) => {
							if (["Enter", " "].includes(e.key)) onNoteSelect(note.id);
						}}
					>
						<div className={styles.noteTitle}>
							{note.title || "Untitled Note"}
						</div>
						<div className={styles.notePreview}>
							{stripHtmlTags(note.content).substring(0, 100) || "No content"}
						</div>
						<button
							className={styles.deleteButton}
							title="Delete note"
							onClick={(e) => {
								e.stopPropagation();
								setDeleteModal({ isOpen: true, noteId: note.id });
							}}
						>
							×
						</button>
					</div>
				))}
			</div>
			<Modal
				isOpen={deleteModal.isOpen}
				onClose={() => setDeleteModal({ isOpen: false, noteId: null })}
				onConfirm={() => {
					onDeleteNote(deleteModal.noteId);
					setDeleteModal({ isOpen: false, noteId: null });
				}}
				title="Delete Note"
				message="Are you sure you want to delete this note? You can recover it from the Archive later."
			/>
		</div>
	);
};

export default NoteList;

const stripHtmlTags = (html) =>
	html
		.replace(/<[^>]*>\s*<\/[^>]*>/g, "") // Remove empty elements with whitespace
		.replace(/<[^>]*>/g, " ") // Replace remaining tags with space
		.replace(/\s+/g, " ") // Normalize whitespace
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.trim(); // Remove leading/trailing whitespace
