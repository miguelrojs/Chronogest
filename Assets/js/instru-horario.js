// Usar un namespace para evitar colisiones con otros scripts
const HorariosModule = {
    horarios: [
        { dia: "Lunes", hora: "10:00 AM", ambiente: "A101" },
        { dia: "Martes", hora: "2:00 PM", ambiente: "B202" },
        { dia: "Miércoles", hora: "9:00 AM", ambiente: "C303" }
    ],

    // Función para cargar los horarios en la tabla
    cargarHorarios: function() {
        const tablaHorarios = document.getElementById("tabla-horarios");
        this.horarios.forEach((horario, index) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${horario.dia}</td>
                <td>${horario.hora}</td>
                <td>${horario.ambiente}</td>
                <td><button onclick="HorariosModule.solicitarCambio(${index})">Solicitar Cambio</button></td>
            `;
            tablaHorarios.appendChild(fila);
        });
    },

    // Función para manejar la solicitud de cambio de horario
    solicitarCambio: function(index) {
        document.getElementById("hora").value = index; // Guarda el índice del horario
        document.getElementById("hora-nueva").value = this.horarios[index].hora;
        document.getElementById("motivo").value = "";
    },

    // Función para manejar el envío del formulario
    enviarSolicitud: function(event) {
        event.preventDefault();

        const indiceHorario = document.getElementById("hora").value; // Obtener el índice del horario seleccionado
        const nuevaHora = document.getElementById("hora-nueva").value;
        const motivo = document.getElementById("motivo").value;

        // Validar que se haya proporcionado un motivo y una nueva hora
        if (nuevaHora === "" || motivo === "") {
            alert("Por favor, complete todos los campos.");
            return;
        }

        // Simulación de la respuesta del administrador
        const respuesta = this.confirmarCambio(nuevaHora, motivo);

        // Mostrar respuesta del administrador
        const respuestaDiv = document.getElementById("respuesta-admin");
        document.getElementById("respuesta").innerText = respuesta;
        
        // Limpiar formulario después de enviar
        document.getElementById("form-cambio").reset();
    },

    // Función que simula la respuesta del administrador
    confirmarCambio: function(nuevaHora, motivo) {
        // Lógica simple de aceptación/rechazo
        if (motivo.length > 10) {
            return "El cambio ha sido aceptado.";
        } else {
            return "El cambio ha sido rechazado. La justificación no es suficiente.";
        }
    }
};

// Cargar horarios una vez que el DOM esté listo
document.addEventListener("DOMContentLoaded", function() {
    HorariosModule.cargarHorarios();
    
    // Asociar el evento de envío del formulario
    document.getElementById("form-cambio").addEventListener("submit", function(event) {
        HorariosModule.enviarSolicitud(event);
    });
});
