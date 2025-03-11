document.addEventListener("DOMContentLoaded", () => {
    cargarFinanzas();
    inicializarGrafico();
});

// 📌 Variables globales
let finanzasData = [];
let chartInstance = null;

// 📌 Función para cargar datos de finanzas desde el backend
async function cargarFinanzas() {
    try {
        const response = await fetch("/api/finanzas");
        finanzasData = await response.json();
        actualizarTabla();
        actualizarGrafico();
    } catch (error) {
        console.error("🚨 Error al cargar finanzas:", error);
    }
}

// 📌 Función para actualizar la tabla de finanzas
function actualizarTabla() {
    const tabla = document.getElementById("tablaFinanzas");
    tabla.innerHTML = "";

    finanzasData.forEach(finanza => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${new Date(finanza.fecha).toLocaleDateString()}</td>
            <td>${finanza.descripcion}</td>
            <td class="${finanza.tipo === "ingreso" ? "ingreso" : "gasto"}">${finanza.tipo}</td>
            <td>${formatoMoneda(finanza.monto)}</td>
        `;
        tabla.appendChild(fila);
    });
}

// 📌 Función para inicializar el gráfico de finanzas
function inicializarGrafico() {
    const ctx = document.getElementById("finanzasChart").getContext("2d");
    
    chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
            labels: [],
            datasets: [
                {
                    label: "Ingresos",
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                    data: []
                },
                {
                    label: "Gastos",
                    backgroundColor: "rgba(255, 99, 132, 0.6)",
                    data: []
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// 📌 Función para actualizar el gráfico con datos reales
function actualizarGrafico() {
    const ingresos = finanzasData.filter(f => f.tipo === "ingreso");
    const gastos = finanzasData.filter(f => f.tipo === "gasto");

    const labels = [...new Set(finanzasData.map(f => new Date(f.fecha).toLocaleDateString()))];
    const ingresosDatos = labels.map(date => ingresos.filter(f => new Date(f.fecha).toLocaleDateString() === date)
        .reduce((total, f) => total + f.monto, 0));
    const gastosDatos = labels.map(date => gastos.filter(f => new Date(f.fecha).toLocaleDateString() === date)
        .reduce((total, f) => total + f.monto, 0));

    chartInstance.data.labels = labels;
    chartInstance.data.datasets[0].data = ingresosDatos;
    chartInstance.data.datasets[1].data = gastosDatos;
    chartInstance.update();
}

// 📌 Función para exportar datos a Excel
function exportarExcel() {
    const ws = XLSX.utils.json_to_sheet(finanzasData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Finanzas");
    XLSX.writeFile(wb, "finanzas.xlsx");
}

// 📌 Función para exportar datos a PDF
function exportarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Reporte Financiero", 20, 10);
    doc.autoTable({
        head: [["Fecha", "Descripción", "Tipo", "Monto"]],
        body: finanzasData.map(f => [
            new Date(f.fecha).toLocaleDateString(),
            f.descripcion,
            f.tipo,
            formatoMoneda(f.monto)
        ])
    });

    doc.save("reporte_finanzas.pdf");
}

// 📌 Formato de moneda
function formatoMoneda(valor) {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP"
    }).format(valor);
}

// 📌 Función para filtrar datos por mes y tipo
function filtrarDatos() {
    const mesSeleccionado = document.getElementById("filtroMes").value;
    const tipoSeleccionado = document.getElementById("filtroTipo").value;

    const datosFiltrados = finanzasData.filter(f => {
        const fecha = new Date(f.fecha);
        const mesAño = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}`;
        return (mesSeleccionado === "" || mesAño === mesSeleccionado) &&
               (tipoSeleccionado === "" || f.tipo === tipoSeleccionado);
    });

    actualizarTabla(datosFiltrados);
}

// 📌 Event Listeners
document.getElementById("exportarExcel").addEventListener("click", exportarExcel);
document.getElementById("exportarPDF").addEventListener("click", exportarPDF);
document.getElementById("filtrarDatos").addEventListener("click", filtrarDatos);
