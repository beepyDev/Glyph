import { useState, useEffect, useRef } from "react";
import styles from "./NoteEditor.module.css";

const NoteEditor = ({ note, onUpdateNote, onNewNote }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [title, setTitle] = useState("");
  const contentRef = useRef(null);

  useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      if (contentRef.current) {
        const currentContent = contentRef.current.innerHTML;
        if (currentContent !== (note.content || "")) {
          contentRef.current.innerHTML = note.content || "";
          // Move cursor to end
          const range = document.createRange();
          const sel = window.getSelection();
          range.selectNodeContents(contentRef.current);
          range.collapse(false);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    }
  }, [note]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    onUpdateNote({
      ...note,
      title: e.target.value,
      lastModified: Date.now(),
    });
  };

  const handleContentChange = () => {
    if (!contentRef.current) return;

    const newContent = contentRef.current.innerHTML;
    if (note.content !== newContent) {
      onUpdateNote({
        ...note,
        content: newContent,
        lastModified: Date.now(),
      });
    }
  };

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, [note]);

  if (!note) {
    return (
      <div
        className={`${styles.emptyEditor} ${!isVisible ? styles.hidden : ""}`}
      >
        <p style={{ textAlign: "center" }}>
          👋 Welcome to Glyph
          <br />
          <a
            onClick={onNewNote}
            style={{
              cursor: "pointer",
              textDecoration: "none",
              fontWeight: "bold",
            }}
            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
          >
            + new note
          </a>
          <div style={{ position: "relative", top: "calc(50vh - 2em - 16px)" }}>
            <a href="https://x.com/cldratio">@cldratio</a> •{" "}
            <a
              onClick={() => {
                window.alert(
                  "Bitcoin address:\nbc1qsya9j8q8z8aqsx5vscsfws779x6pa3azd0tykt"
                );
              }}
            >
              $BTC
            </a>
          </div>
        </p>
      </div>
    );
  }

  return (
    <div className={`${styles.editor} ${!isVisible ? styles.hidden : ""}`}>
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Untitled Note"
        className={styles.titleInput}
      />
      <div
        ref={contentRef}
        contentEditable
        placeholder="Type away..."
        className={styles.contentInput}
        onInput={handleContentChange}
      />
    </div>
  );
};

export default NoteEditor;
