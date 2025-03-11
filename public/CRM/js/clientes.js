document.addEventListener("DOMContentLoaded", () => {
    cargarClientes();

    // Evento para abrir el modal de nuevo cliente
    document.getElementById("addCliente").addEventListener("click", () => {
        abrirModal();
    });

    // Evento para cerrar el modal
    document.querySelector(".close-modal").addEventListener("click", () => {
        cerrarModal();
    });

    // Evento para guardar un cliente
    document.getElementById("guardarCliente").addEventListener("click", async () => {
        await guardarCliente();
    });
});

// 📌 Cargar Clientes desde el Backend
async function cargarClientes() {
    const clientesTable = document.getElementById("clientesTable");
    clientesTable.innerHTML = "<tr><td colspan='5'>Cargando...</td></tr>";

    try {
        const res = await fetch("/api/clientes");
        const data = await res.json();

        clientesTable.innerHTML = "";
        data.forEach(cliente => {
            const row = `
                <tr>
                    <td>${cliente.nombre}</td>
                    <td>${cliente.email}</td>
                    <td>${cliente.telefono}</td>
                    <td>${cliente.estado}</td>
                    <td>
                        <button class="edit" onclick="editarCliente(${cliente.id})"><i class="fas fa-edit"></i></button>
                        <button class="delete" onclick="eliminarCliente(${cliente.id})"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `;
            clientesTable.innerHTML += row;
        });
    } catch (error) {
        console.error("Error al cargar clientes:", error);
    }
}

// 📌 Guardar o Editar Cliente
async function guardarCliente() {
    const id = document.getElementById("clienteId").value;
    const nombre = document.getElementById("clienteNombre").value;
    const email = document.getElementById("clienteEmail").value;
    const telefono = document.getElementById("clienteTelefono").value;
    const estado = document.getElementById("clienteEstado").value;

    const cliente = { nombre, email, telefono, estado };

    const url = id ? `/api/clientes/${id}` : "/api/clientes";
    const method = id ? "PUT" : "POST";

    try {
        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cliente)
        });

        cerrarModal();
        cargarClientes();
    } catch (error) {
        console.error("Error al guardar cliente:", error);
    }
}

// 📌 Eliminar Cliente
async function eliminarCliente(id) {
    if (confirm("¿Estás seguro de eliminar este cliente?")) {
        await fetch(`/api/clientes/${id}`, { method: "DELETE" });
        cargarClientes();
    }
}

// 📌 Editar Cliente
async function editarCliente(id) {
    const res = await fetch(`/api/clientes/${id}`);
    const cliente = await res.json();

    document.getElementById("clienteId").value = cliente.id;
    document.getElementById("clienteNombre").value = cliente.nombre;
    document.getElementById("clienteEmail").value = cliente.email;
    document.getElementById("clienteTelefono").value = cliente.telefono;
    document.getElementById("clienteEstado").value = cliente.estado;

    abrirModal("Editar Cliente");
}

// 📌 Mostrar/Cerrar Modal
function abrirModal(titulo = "Agregar Cliente") {
    document.getElementById("modalTitle").innerText = titulo;
    document.getElementById("clienteModal").style.display = "block";
}

function cerrarModal() {
    document.getElementById("clienteModal").style.display = "none";
}
