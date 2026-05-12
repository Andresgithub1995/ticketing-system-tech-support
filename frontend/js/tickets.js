const API_URL = 'http://localhost:3000/api/tickets';

const ticketsTableBody = document.getElementById('ticketsTableBody');
const ticketForm = document.getElementById('ticketForm');

const openCount = document.getElementById('openCount');
const processCount = document.getElementById('processCount');
const closedCount = document.getElementById('closedCount');
const totalCount = document.getElementById('totalCount');

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

function updateSummary(tickets) {
    const openTickets = tickets.filter(ticket => ticket.status === 'open').length;
    const processTickets = tickets.filter(ticket => ticket.status === 'in_process').length;
    const closedTickets = tickets.filter(ticket => ticket.status === 'closed').length;

    openCount.textContent = openTickets;
    processCount.textContent = processTickets;
    closedCount.textContent = closedTickets;
    totalCount.textContent = tickets.length;
}

async function loadTickets() {
    try {
        const response = await fetch(API_URL);
        const tickets = await response.json();

        ticketsTableBody.innerHTML = '';

        updateSummary(tickets);

        tickets.forEach(ticket => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${ticket.id}</td>
                <td>${ticket.title}</td>
                <td>${translateStatus(ticket.status)}</td>
                <td>${translatePriority(ticket.priority)}</td>
                <td>${new Date(ticket.created_at).toLocaleString()}</td>
                <td>
                    ${
                        ticket.status !== 'closed'
                            ? `<button class="close-btn" onclick="closeTicket(${ticket.id})">Cerrar</button>`
                            : `<span class="closed-label">Cerrado</span>`
                    }
                </td>
            `;

            ticketsTableBody.appendChild(row);
        });

    } catch (error) {
        console.error('Error cargando tickets:', error);
    }
}

async function createTicket(event) {
    event.preventDefault();

    const newTicket = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        status: document.getElementById('status').value,
        priority: document.getElementById('priority').value
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTicket)
        });

        if (!response.ok) {
            throw new Error('Error creando ticket');
        }

        ticketForm.reset();
        loadTickets();

    } catch (error) {
        console.error('Error:', error);
    }
}

async function closeTicket(id) {
    try {
        const response = await fetch(`${API_URL}/${id}/close`, {
            method: 'PUT'
        });

        if (!response.ok) {
            throw new Error('Error cerrando ticket');
        }

        loadTickets();

    } catch (error) {
        console.error('Error:', error);
    }
}

ticketForm.addEventListener('submit', createTicket);

loadTickets();