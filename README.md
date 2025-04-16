# Glyph - Reinventing Notes

Glyph is a modern, React-based note-taking application that provides a clean and intuitive interface for managing your notes.
In the future, it will have rich AI integration and robust features. But for now, it's just a modest (but ambitious) notes app.

## Features (already implemented)

- Create and edit notes with a modern interface
- Dark and light mode
- Lightning-fast, responsive design
- Unlimited local note storage
- Auto-saving
- Simple formatting (bold, italic, underline)

## Features (planned)

- AI sidebar that can edit text on its own (like [Cursor](https://github.com/getcursor/cursor))
- Unlimited cloud storage
- Note sharing
- Search functionality
- Note organization (tags, projects/folders)
- Markdown support
- Export notes to various formats (PDF, HTML, etc.)
- Import notes from various formats
- AI auto-completion
- Rich formatting options (headings, lists, etc.)
- Collaboration features (real-time editing)
- Integration with other apps (e.g. Google Drive, Dropbox, X, [0.email](https://0.email/))
- Text-to-speech
- Customizable themes
- Keyboard shortcuts
- Immersive speech-to-text mode
- Built-in LoFi radio
- Better accessibility features
- DeepL translation integration
- An Electron app for Windows, GNU/Linux, and MacOS
- Mobile support and native Android app

## Made with

- React + JSX
- Vite

## Getting Started

## Option 1 - via Vercel

If you want to use or try out Glyph, we recommend using [its deployment on Vercel](https://glyph-ai.vercel.app).  
However, you may also build from source, which will be explained below.

## Option 2 - from source

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/beepyDev/Glyph.git
   cd Glyph
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Build for production
   ```bash
   npm run build
   ```

## Project Structure

```
Glyph/
├── public/
│   └── Glyph.svg
├── src/
│   ├── components/
│   │   ├── Modal
│   │   ├── NoteEditor
│   │   ├── NoteList
│   │   └── ThemeToggle
│   ├── context/
│   │   ├── SidebarContext
│   │   └── ThemeContext
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

## License

This project is licensed under the GNU General Public License v3.0. see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome and encouraged! Please read the [contributing guidelines](CONTRIBUTING.md) first.
