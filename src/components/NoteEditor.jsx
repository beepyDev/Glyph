import { useState, useEffect, useRef } from "react";
import styles from "./NoteEditor.module.css";
import { useTheme } from "../context/ThemeContext";
import { useSidebar } from "../context/SidebarContext";

const NoteEditor = ({ note, onUpdateNote, onNewNote }) => {
	const [isVisible, setIsVisible] = useState(true);
	const { isCollapsed } = useSidebar();
	const [title, setTitle] = useState("");
	const contentRef = useRef(null);
	const { theme } = useTheme();

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

		let newContent = contentRef.current.innerHTML;
		// Clean up empty divs and normalize content
		newContent = newContent
			.replace(/<div><br><\/div>/g, "<br>")
			.replace(/<div><\/div>/g, "")
			.replace(/^\s*<br>\s*$/, "");

		// Update content only if it's different
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
				className={`${styles.emptyEditor} ${!isVisible ? styles.hidden : ""} ${isCollapsed ? styles.sidebarCollapsed : ""}`}
			>
				<img
					src="/Glyph.svg"
					style={{
						position: "absolute",
						width: "300px",
						top: "0px",
						filter:
							theme === "light"
								? "grayscale(100%) brightness(180%)"
								: "grayscale(100%) brightness(50%)",
						userSelect: "none",
						WebkitUserDrag: "none",
						draggable: false,
					}}
				/>
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
		<div className={`${styles.editor} ${!isVisible ? styles.hidden : ""} ${isCollapsed ? styles.sidebarCollapsed : ""}`}>
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
