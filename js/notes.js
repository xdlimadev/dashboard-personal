let notes = [];
let editingNoteId = null;

const NOTE_COLORS = [
  "rgba(167, 113, 245, 0.5)", // morado
  "rgba(66, 165, 245, 0.5)", // azul
  "rgba(102, 187, 106, 0.5)", // verde
  "rgba(255, 167, 38, 0.5)", // naranja
  "rgba(240, 98, 146, 0.5)", // rosa
  "rgba(77, 208, 225, 0.5)", // cyan
];

async function createNote(titleInput, contentInput) {
  const randomIndex = Math.floor(Math.random() * NOTE_COLORS.length);
  const color = NOTE_COLORS[randomIndex];
  const note = {
    title: titleInput,
    content: contentInput,
    color: color,
  };

  const apiCreate = `${API_URL}/notes/create.php`;
  const response = await fetch(apiCreate, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(note),
  });

  if (response.ok) {
    const data = await response.json();
    notes.push({ ...note, id: Number(data.note.id) });
    renderNotes();
    showToast("Nota creada", "success");
  } else {
    showToast("Error al crear nota", "error");
  }
}

async function deleteNote(noteId) {
  const apiDelete = `${API_URL}/notes/delete.php`;
  notes = notes.filter((n) => n.id !== noteId);
  renderNotes();

  const response = await fetch(apiDelete, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ id: noteId }),
  });

  if (!response.ok) {
    await loadNotesFromAPI();
    showToast("No se ha podido eliminar la nota.", "error");
  }
}

async function updateNote(noteId, newTitle, newContent) {
  const apiUpdate = `${API_URL}/notes/update.php`;

  const index = notes.findIndex((n) => n.id === noteId);
  notes[index].title = newTitle;
  notes[index].content = newContent;
  renderNotes();

  const response = await fetch(apiUpdate, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      id: noteId,
      title: newTitle,
      content: newContent,
    }),
  });

  if (response.ok) {
    showToast("La nota se ha actualizado con éxito.", "success");
  } else {
    await loadNotesFromAPI();
    showToast("Error al acutalizar la nota", "error");
  }
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
            <button class="delete-note-btn">x</button>`;
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

// API
async function loadNotesFromAPI() {
  try {
    const response = await fetch(`${API_URL}/notes/read.php`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    if (response.ok) {
      notes = [];

      if (data.notes && data.notes.length > 0) {
        notes = data.notes.map((note) => ({
          ...note,
          id: Number(note.id),
        }));
      }
      renderNotes();
    } else {
      console.error("Error al cargar notas: ", data.message);
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}
