import { useState } from "react";
import styles from "./NoteList.module.css";
import ThemeToggle from "./ThemeToggle";
import "../fonts.css";
import Modal from "./Modal";
import { useSidebar } from "../context/SidebarContext";

const NoteList = ({
  notes,
  activeNote,
  onNoteSelect,
  onNewNote,
  onDeleteNote,

}) => {
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    noteId: null,
  });
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>
      <div className={styles.sidebarHeader}>
        <div className={styles.headerLeft} onClick={() => onNoteSelect(null)} style={{ cursor: "pointer" }}>
          <img src="/Glyph.svg" style={{ height: "2em", userSelect: "none", WebkitUserDrag: "none" }} />
          <h2 style={{ fontFamily: "'Funnel Sans', sans-serif" }}>Glyph</h2>
          <ThemeToggle />
        </div>
        <div className={styles.headerRight}>
          <button onClick={onNewNote} className={styles.newButton}>
            +
          </button>

          <button
            onClick={toggleSidebar}
            className={`${styles.collapseButton} ${
              isCollapsed ? styles.collapsed : ""
            }`}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                fill="currentColor"
                d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
              />
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
            onClick={() => onNoteSelect(note.id === activeNote ? null : note.id)}
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
