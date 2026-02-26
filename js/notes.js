let notes = [];
let editingNoteId = null;

const NOTE_COLORS = [
    'rgba(167, 113, 245, 0.5)',  // morado
    'rgba(66, 165, 245, 0.5)',   // azul
    'rgba(102, 187, 106, 0.5)',  // verde
    'rgba(255, 167, 38, 0.5)',   // naranja
    'rgba(240, 98, 146, 0.5)',   // rosa
    'rgba(77, 208, 225, 0.5)',   // cyan
];

function loadNotes() {
    const saved = localStorage.getItem("notes");
    if (!saved) return;
    notes = JSON.parse(saved);
}

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function createNote(titleInput, contentInput) {
    const randomIndex = Math.floor(Math.random() * NOTE_COLORS.length);
    const color = NOTE_COLORS[randomIndex];
    const note = {
        id: Date.now(),
        title: titleInput,
        content: contentInput,
        color: color,
        created_at: new Date().toISOString()
    }

    notes.push(note);
    saveNotes();
}

function deleteNote(notesId) {
    notes = notes.filter(n => n.id !== notesId);
    saveNotes();
    renderNotes();
}

function updateNote(noteId, newTitle, newContent) {
    const index = notes.findIndex(n => n.id === noteId);
    notes[index].title = newTitle;
    notes[index].content = newContent;
    saveNotes();
    renderNotes();
}

function renderNotes() {
    const container = document.getElementById("notes-container");
    container.innerHTML = "";

    for (const note of notes) {
        const div = document.createElement("div");
        div.className = "note-tag";
        div.dataset.id = note.id;
        div.style.background = note.color;
        div.innerHTML = `
            <span class="note-title">${note.title}</span>
            <button class="delete-note-btn">x</button>`
            ;
        container.appendChild(div);

        const deleteBtn = div.querySelector(".delete-note-btn");
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            deleteNote(note.id);
        });

        div.addEventListener("click", (e) => {
            editingNoteId = note.id;
            const titleInput = document.getElementById("notes-title-input");
            const contentInput = document.getElementById("notes-content-input");
            const modal = document.getElementById("notes-modal");

            titleInput.value = note.title;
            contentInput.value = note.content;
            modal.style.display = "flex";
        });
    }
}

function setupNotesModal() {
    const modal = document.getElementById("notes-modal");
    const addBtn = document.getElementById("btn-add-notes");
    const cancelBtn = document.getElementById("btn-cancel-note");

    const titleInput = document.getElementById("notes-title-input");
    const contentInput = document.getElementById("notes-content-input");
    const saveBtn = document.getElementById("btn-save-note");

    addBtn.addEventListener("click", () => {
        modal.style.display = "flex";
    });
    cancelBtn.addEventListener("click", () => {
        titleInput.value = "";
        contentInput.value = "";
        modal.style.display = "none";
    });

    saveBtn.addEventListener("click", () => {
        if (editingNoteId === null) {
            createNote(titleInput.value, contentInput.value);
            renderNotes();
            titleInput.value = "";
            contentInput.value = "";
            modal.style.display = "none";
        } else {
            updateNote(editingNoteId, titleInput.value, contentInput.value);
            titleInput.value = "";
            contentInput.value = "";
            modal.style.display = "none";
            editingNoteId = null;
        }
    });
}