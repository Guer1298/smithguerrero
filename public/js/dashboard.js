document.addEventListener("DOMContentLoaded", () => {
    cargarCasos();
    cargarClientes();
    cargarAgenda();
    cargarFinanzas();
    cargarIndicadores();
    configurarFiltros();
    configurarSocket();
});

document.addEventListener("DOMContentLoaded", () => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
        window.location.href = "login-abogado.html";
    }

    fetch('/api/abogado-info', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${userToken}` }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('abogado-nombre').innerText = `👨‍⚖️ ${data.nombre}`;
        cargarCasos(data.id);
        cargarClientes(data.id);
        cargarFinanzas(data.id);
    })
    .catch(error => console.error("Error al obtener datos del abogado:", error));
});

function cargarCasos(abogadoId) {
    fetch(`/api/casos?abogado_id=${abogadoId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('casos-list').innerHTML = data.map(caso => `
                <tr>
                    <td>${caso.id}</td>
                    <td>${caso.cliente}</td>
                    <td>${caso.estado}</td>
                    <td>${caso.fecha_limite}</td>
                    <td><a href="#">Ver</a></td>
                </tr>
            `).join("");
        })
        .catch(error => console.error("Error al cargar casos:", error));
}


// =============================
// 🔹 FILTROS AVANZADOS EN CASOS
// =============================
function configurarFiltros() {
    document.getElementById('filtro-estado').addEventListener('change', cargarCasos);
    document.getElementById('filtro-cliente').addEventListener('input', cargarCasos);
}

function cargarCasos() {
    const estadoFiltro = document.getElementById('filtro-estado').value;
    const clienteFiltro = document.getElementById('filtro-cliente').value.toLowerCase();

    fetch('/api/casos')
        .then(response => response.json())
        .then(data => {
            const casosContainer = document.getElementById('casos-list');
            casosContainer.innerHTML = "";
            data
                .filter(caso => 
                    (estadoFiltro === "todos" || caso.estado === estadoFiltro) &&
                    (clienteFiltro === "" || caso.cliente.toLowerCase().includes(clienteFiltro))
                )
                .forEach(caso => {
                    const casoHTML = `
                        <tr>
                            <td>${caso.id}</td>
                            <td>${caso.cliente}</td>
                            <td>${caso.estado}</td>
                            <td>${caso.fecha_limite}</td>
                            <td><a href="#">Ver</a></td>
                        </tr>
                    `;
                    casosContainer.innerHTML += casoHTML;
                });
        })
        .catch(error => console.error("Error al cargar casos:", error));
}

// =============================
// 🔹 INTEGRACIÓN CON GOOGLE CALENDAR
// =============================
function cargarAgenda() {
    fetch('/api/agenda')
        .then(response => response.json())
        .then(data => {
            const agendaContainer = document.getElementById('agenda-list');
            agendaContainer.innerHTML = "";
            data.forEach(evento => {
                const eventoHTML = `
                    <div class="agenda-item">
                        📅 ${evento.fecha} - ${evento.descripcion}
                        <button onclick="agregarEventoGoogle('${evento.fecha}', '${evento.descripcion}')">📆 Agendar</button>
                    </div>
                `;
                agendaContainer.innerHTML += eventoHTML;
            });
        })
        .catch(error => console.error("Error al cargar agenda:", error));
}

function agregarEventoGoogle(fecha, descripcion) {
    const event = {
        summary: descripcion,
        start: { dateTime: `${fecha}T09:00:00`, timeZone: "America/Bogota" },
        end: { dateTime: `${fecha}T10:00:00`, timeZone: "America/Bogota" }
    };

    fetch('/api/google-calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
    })
    .then(response => response.json())
    .then(data => alert("Evento agregado con éxito a Google Calendar"))
    .catch(error => console.error("Error al agregar evento:", error));
}

// =============================
// 🔹 NOTIFICACIONES EN TIEMPO REAL (Socket.io)
// =============================
function configurarSocket() {
    const socket = io();

    // Notificación cuando se agrega un nuevo caso
    socket.on('nuevoCaso', (caso) => {
        alert(`📢 Nuevo caso agregado: ${caso.cliente} - ${caso.estado}`);
        cargarCasos();
    });

    // Notificación cuando se agrega un nuevo cliente
    socket.on('nuevoCliente', (cliente) => {
        alert(`📢 Nuevo cliente registrado: ${cliente.nombre}`);
        cargarClientes();
    });

    // Notificación cuando se agenda una nueva cita
    socket.on('nuevaCita', (cita) => {
        alert(`📢 Nueva cita programada para ${cita.cliente} el ${cita.fecha}`);
        cargarAgenda();
    });
}

// =============================
// 🔹 GESTIÓN FINANCIERA
// =============================
function cargarFinanzas() {
    fetch('/api/finanzas')
        .then(response => response.json())
        .then(data => {
            document.getElementById('total-facturado').innerText = `$${data.totalFacturado}`;
            document.getElementById('pagos-pendientes').innerText = `$${data.pagosPendientes}`;
        })
        .catch(error => console.error("Error al cargar finanzas:", error));
}

// =============================
// 🔹 INDICADORES DE DESEMPEÑO
// =============================
function cargarIndicadores() {
    fetch('/api/indicadores')
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('indicadoresChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Casos Ganados', 'Casos Perdidos', 'Casos en Curso'],
                    datasets: [{
                        label: 'Casos',
                        data: [data.casosGanados, data.casosPerdidos, data.casosEnCurso],
                        backgroundColor: ['#2ECC71', '#E74C3C', '#F1C40F']
                    }]
                }
            });
        })
        .catch(error => console.error("Error al cargar indicadores:", error));
}

// =============================
// 🔹 CERRAR SESIÓN
// =============================
document.getElementById('cerrar-sesion').addEventListener('click', () => {
    localStorage.removeItem("userToken");
    window.location.href = "login-abogado.html";
});
