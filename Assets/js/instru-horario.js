document.addEventListener("DOMContentLoaded", function() {
    // Datos simulados
    const horarios = [
        { dia: "Lunes", hora: "10:00 AM", ambiente: "A101" },
        { dia: "Martes", hora: "2:00 PM", ambiente: "B202" },
        { dia: "Miércoles", hora: "9:00 AM", ambiente: "C303" }
    ];

    // Mostrar los horarios
    const tablaHorarios = document.getElementById("tabla-horarios");
    horarios.forEach((horario, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${horario.dia}</td>
            <td>${horario.hora}</td>
            <td>${horario.ambiente}</td>
            <td><button onclick="verificarCambio(${index})">Solicitar Cambio</button></td>
        `;
        tablaHorarios.appendChild(fila);
    });

    // Función para manejar la solicitud de cambio de horario
    document.getElementById("form-cambio").addEventListener("submit", function(event) {
        event.preventDefault();

        const horaActual = horarios[parseInt(document.getElementById("hora").value)].hora;
        const nuevaHora = document.getElementById("hora-nueva").value;
        const motivo = document.getElementById("motivo").value;

        // Enviar solicitud al administrador (simulado)
        const respuesta = confirmarCambio(nuevaHora, motivo);

        // Mostrar respuesta del administrador
        const respuestaDiv = document.getElementById("respuesta-admin");
        document.getElementById("respuesta").innerText = respuesta;
    });

    // Función para verificar y mostrar detalles del cambio
    function verificarCambio(index) {
        document.getElementById("hora").value = index; // Guarda el índice del horario
        document.getElementById("hora-nueva").value = horarios[index].hora;
        document.getElementById("motivo").value = "";
    }

    // Función que simula la respuesta del administrador
    function confirmarCambio(nuevaHora, motivo) {
        if (nuevaHora && motivo) {
            return "El cambio ha sido aceptado.";
        } else {
            return "El cambio ha sido rechazado. Se necesita una razón válida.";
        }
    }
});
