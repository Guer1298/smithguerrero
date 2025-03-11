document.addEventListener("DOMContentLoaded", () => {
    cargarCasos();
    agregarEventos();
});

// 📝 Datos de prueba (reemplazar con API real)
let casos = [
    { expediente: "EXP-001", cliente: "Juan Pérez", tipo: "Civil", abogado: "María Gómez", estado: "abierto", fecha: "2024-03-10", plazo: "2024-05-01", documentos: [] },
    { expediente: "EXP-002", cliente: "Carlos López", tipo: "Penal", abogado: "Juan Pérez", estado: "negociacion", fecha: "2024-03-12", plazo: "2024-04-15", documentos: [] }
];

let paginaActual = 1;
const casosPorPagina = 5;

// 📂 Cargar Casos en la Tabla con Paginación
function cargarCasos() {
    const tabla = document.getElementById("casesTable");
    tabla.innerHTML = "";

    const inicio = (paginaActual - 1) * casosPorPagina;
    const casosPaginados = casos.slice(inicio, inicio + casosPorPagina);

    casosPaginados.forEach(caso => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${caso.expediente}</td>
            <td>${caso.cliente}</td>
            <td>${caso.tipo}</td>
            <td>${caso.abogado}</td>
            <td><span class="estado ${caso.estado}">${formatearEstado(caso.estado)}</span></td>
            <td>${caso.fecha}</td>
            <td>${caso.plazo}</td>
            <td>${caso.documentos.length} 📁</td>
            <td>
                <button class="editar"><i class="fas fa-edit"></i></button>
                <button class="eliminar"><i class="fas fa-trash"></i></button>
                <button class="subirDoc" data-expediente="${caso.expediente}"><i class="fas fa-upload"></i></button>
            </td>
        `;
        tabla.appendChild(fila);
    });

    actualizarPaginacion();
}

// 🔍 Buscar Caso en Tiempo Real
document.getElementById("searchCase").addEventListener("keyup", (e) => {
    const termino = e.target.value.toLowerCase();
    casos = casos.filter(caso => caso.cliente.toLowerCase().includes(termino) || caso.expediente.toLowerCase().includes(termino));
    cargarCasos();
});

// 📌 Filtrar Casos por Estado
document.getElementById("filterStatus").addEventListener("change", (e) => {
    const estado = e.target.value;
    casos = estado ? casos.filter(caso => caso.estado === estado) : casos;
    cargarCasos();
});

// ➕ Agregar un Nuevo Caso
document.getElementById("addCase").addEventListener("click", () => {
    const expediente = prompt("Número de Expediente:");
    const cliente = prompt("Nombre del Cliente:");
    const tipo = prompt("Tipo de Caso (Civil, Penal, etc.):");
    const abogado = prompt("Abogado Asignado:");
    const fecha = new Date().toISOString().split("T")[0];
    
    if (expediente && cliente && tipo && abogado) {
        casos.push({ expediente, cliente, tipo, abogado, estado: "abierto", fecha, plazo: "Por definir", documentos: [] });
        cargarCasos();
    }
});

// 🔄 Paginación
document.getElementById("prevPage").addEventListener("click", () => {
    if (paginaActual > 1) {
        paginaActual--;
        cargarCasos();
    }
});

document.getElementById("nextPage").addEventListener("click", () => {
    if (paginaActual * casosPorPagina < casos.length) {
        paginaActual++;
        cargarCasos();
    }
});

function actualizarPaginacion() {
    document.getElementById("pageNumber").textContent = paginaActual;
}

// 📄 Gestión Documental (Subir Archivos Asociados a un Cliente)
document.getElementById("uploadBtn").addEventListener("click", () => {
    const inputFile = document.getElementById("uploadDocument");
    inputFile.click();
});

document.getElementById("uploadDocument").addEventListener("change", (e) => {
    const expedienteSeleccionado = prompt("Ingrese el número de expediente para asociar el documento:");

    let casoEncontrado = casos.find(c => c.expediente === expedienteSeleccionado);
    if (!casoEncontrado) {
        alert("Expediente no encontrado.");
        return;
    }

    for (let archivo of e.target.files) {
        casoEncontrado.documentos.push({
            nombre: archivo.name,
            tipo: archivo.type,
            fecha: new Date().toLocaleDateString(),
            usuario: "Juan Pérez"
        });
    }

    cargarCasos();
    mostrarDocumentos(expedienteSeleccionado);
});

// 📂 Mostrar Documentos de un Caso
function mostrarDocumentos(expediente) {
    const lista = document.getElementById("documentList");
    lista.innerHTML = "";

    let caso = casos.find(c => c.expediente === expediente);
    if (!caso || caso.documentos.length === 0) {
        lista.innerHTML = "<tr><td colspan='5'>No hay documentos asociados.</td></tr>";
        return;
    }

    caso.documentos.forEach(doc => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${doc.nombre}</td>
            <td>${doc.tipo}</td>
            <td>${doc.fecha}</td>
            <td>${doc.usuario}</td>
            <td><button class="descargar"><i class="fas fa-download"></i></button></td>
        `;
        lista.appendChild(fila);
    });
}

// 📊 Línea de Tiempo Interactiva (Seguimiento del Caso)
function cargarLineaDeTiempo() {
    const timeline = document.getElementById("timeline");
    timeline.innerHTML = `
        <ul>
            <li>📌 Caso creado - ${new Date().toLocaleDateString()}</li>
            <li>🤝 En Negociación - ${sumarDias(new Date(), 5)}</li>
            <li>⚖️ Audiencia programada - ${sumarDias(new Date(), 15)}</li>
        </ul>
    `;
}

function sumarDias(fecha, dias) {
    let nuevaFecha = new Date(fecha);
    nuevaFecha.setDate(nuevaFecha.getDate() + dias);
    return nuevaFecha.toLocaleDateString();
}

// 📅 Integración con Google Calendar
document.getElementById("syncGoogleCalendar").addEventListener("click", () => {
    alert("🔗 Sincronización con Google Calendar en proceso...");
    setTimeout(() => {
        alert("✅ Calendario sincronizado con éxito.");
    }, 2000);
});

// 🏷️ Función para Formatear Estados
function formatearEstado(estado) {
    switch (estado) {
        case "abierto": return "🟢 Abierto";
        case "negociacion": return "🟡 En Negociación";
        case "corte": return "⚖️ En Corte";
        case "cerrado": return "🔴 Cerrado";
        default: return "⚠️ Desconocido";
    }
}

// 🔄 Agregar Eventos Dinámicos a Botones
function agregarEventos() {
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("editar")) {
            alert("✏️ Editando caso...");
        } else if (e.target.classList.contains("eliminar")) {
            if (confirm("¿Eliminar este caso?")) {
                e.target.closest("tr").remove();
            }
        }
    });

    cargarLineaDeTiempo();
}
