const API_BASE_URL = 'http://localhost:3000/api';

const params = new URLSearchParams(window.location.search);
const ticketId = params.get('id');

const ticketTitle = document.getElementById('ticketTitle');
const ticketStatus = document.getElementById('ticketStatus');
const ticketDescription = document.getElementById('ticketDescription');
const ticketPriority = document.getElementById('ticketPriority');
const ticketDate = document.getElementById('ticketDate');

const noteForm = document.getElementById('noteForm');
const noteInput = document.getElementById('noteInput');
const notesList = document.getElementById('notesList');

function translateStatus(status) {
    const statuses = {
        open: 'Abierto',
        in_process: 'En proceso',
        closed: 'Cerrado'
    };

    return statuses[status] || status;
}

function translatePriority(priority) {
    const priorities = {
        low: 'Baja',
        medium: 'Media',
        high: 'Alta'
    };

    return priorities[priority] || priority;
}

async function loadTicket() {
    try {
        const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}`);
        const ticket = await response.json();

        ticketTitle.textContent = `Ticket #${ticket.id}: ${ticket.title}`;
        ticketStatus.textContent = `Estado: ${translateStatus(ticket.status)}`;
        ticketDescription.textContent = ticket.description;
        ticketPriority.textContent = translatePriority(ticket.priority);
        ticketDate.textContent = new Date(ticket.created_at).toLocaleString();

    } catch (error) {
        console.error('Error cargando ticket:', error);
    }
}

async function loadNotes() {
    try {
        const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}/notes`);
        const notes = await response.json();

        notesList.innerHTML = '';

        if (notes.length === 0) {
            notesList.innerHTML = '<p class="empty-message">Este ticket todavía no tiene notas.</p>';
            return;
        }

        notes.forEach(note => {
            const noteCard = document.createElement('div');
            noteCard.classList.add('note-item');

            noteCard.innerHTML = `
                <p>${note.note}</p>
                <small>${new Date(note.created_at).toLocaleString()}</small>
            `;

            notesList.appendChild(noteCard);
        });

    } catch (error) {
        console.error('Error cargando notas:', error);
    }
}

async function createNote(event) {
    event.preventDefault();

    const newNote = {
        note: noteInput.value
    };

    try {
        const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newNote)
        });

        if (!response.ok) {
            throw new Error('Error creando nota');
        }

        noteForm.reset();
        loadNotes();

    } catch (error) {
        console.error('Error:', error);
    }
}

noteForm.addEventListener('submit', createNote);

loadTicket();
loadNotes();