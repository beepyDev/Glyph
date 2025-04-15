import { useState, useEffect } from 'react'
import './App.css'
import NoteList from './components/NoteList'
import NoteEditor from './components/NoteEditor'
import { SidebarProvider } from './context/SidebarContext'

function App() {
	const [notes, setNotes] = useState(() => {
		const savedNotes = localStorage.getItem('notes')
		return savedNotes ? JSON.parse(savedNotes) : []
	})
	const [activeNoteId, setActiveNoteId] = useState(null)

	const activeNote = notes.find(note => note.id === activeNoteId)

	const onAddNote = () => {
		const newNote = {
			id: Date.now(),
			title: 'Untitled Note',
			content: '',
			lastModified: Date.now()
		}
		setNotes([newNote, ...notes])
		setActiveNoteId(newNote.id)
	}

	useEffect(() => {
		localStorage.setItem('notes', JSON.stringify(notes))
	}, [notes])

	const onUpdateNote = (updatedNote) => {
		const updatedNotes = notes.map(note =>
			note.id === updatedNote.id ? updatedNote : note
		)
		setNotes(updatedNotes)
	}

	const onDeleteNote = (id) => {
		setNotes(notes.filter(note => note.id !== id))
		if (activeNoteId === id) {
			setActiveNoteId(notes.length > 1 ? notes[0].id : null)
		}
	}

	return (
		<SidebarProvider>
			<div className="App">
				<NoteList
				notes={notes}
				activeNote={activeNoteId}
				onNoteSelect={setActiveNoteId}
				onNewNote={onAddNote}
				onDeleteNote={onDeleteNote}
			/>
			<NoteEditor
				note={activeNote}
				onUpdateNote={onUpdateNote}
				onNewNote={onAddNote}
				/>
			</div>
		</SidebarProvider>
	)
}

export default App
