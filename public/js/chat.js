const socket = io("http://localhost:5001");

document.getElementById("enviar-mensaje").addEventListener("click", () => {
    const mensaje = document.getElementById("mensaje").value;
    socket.emit("mensaje", mensaje);
    document.getElementById("mensaje").value = "";
});

socket.on("mensaje", (msg) => {
    const chat = document.getElementById("chat-mensajes");
    chat.innerHTML += `<p>${msg}</p>`;
});
