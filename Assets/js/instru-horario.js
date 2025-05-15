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

        // Crear objeto de solicitud
        const solicitud = {
            indiceHorario,
            nuevaHora,
            motivo,
            estado: "Pendiente", // Inicialmente la solicitud está pendiente
        };

        // Guardar la solicitud en LocalStorage
        let solicitudes = JSON.parse(localStorage.getItem("solicitudes")) || [];
        solicitudes.push(solicitud);
        localStorage.setItem("solicitudes", JSON.stringify(solicitudes));

        // Mostrar respuesta del administrador
        this.mostrarRespuesta("La solicitud ha sido enviada.");
        
        // Limpiar formulario después de enviar
        document.getElementById("form-cambio").reset();
    },

    // Función para mostrar la respuesta en la interfaz
    mostrarRespuesta: function(respuesta) {
        const respuestaDiv = document.getElementById("respuesta-admin");
        document.getElementById("respuesta").innerText = respuesta;
    },

    // Función para mostrar la lista de solicitudes
    mostrarSolicitudes: function(rol) {
        const solicitudes = JSON.parse(localStorage.getItem("solicitudes")) || [];
        const listaSolicitudes = document.getElementById("lista-solicitudes");
        listaSolicitudes.innerHTML = ""; // Limpiar la lista antes de mostrar las solicitudes

        solicitudes.forEach((solicitud, index) => {
            const item = document.createElement("li");
            item.innerHTML = `
                Solicitud para el horario ${this.horarios[solicitud.indiceHorario].dia} a las ${solicitud.nuevaHora}: ${solicitud.motivo}.
                <strong>Estado: ${solicitud.estado}</strong>
                ${rol === "Administrador" ? `<button onclick="HorariosModule.cambiarEstado(${index})">Aceptar/Rechazar</button>` : ""}
            `;
            listaSolicitudes.appendChild(item);
        });
    },

    // Función para cambiar el estado de la solicitud (aceptar o rechazar)
    cambiarEstado: function(index) {
        let solicitudes = JSON.parse(localStorage.getItem("solicitudes"));
        const solicitud = solicitudes[index];
        
        // Cambiar el estado de la solicitud
        if (solicitud.estado === "Pendiente") {
            solicitud.estado = "Aceptado"; // Cambiar estado a aceptado
        } else if (solicitud.estado === "Aceptado") {
            solicitud.estado = "Rechazado"; // Cambiar estado a rechazado
        } else {
            solicitud.estado = "Pendiente"; // Volver a pendiente
        }

        // Guardar de nuevo en LocalStorage
        localStorage.setItem("solicitudes", JSON.stringify(solicitudes));
        this.mostrarSolicitudes("Administrador"); // Actualizar la lista de solicitudes
    }
};

// Cargar horarios una vez que el DOM esté listo
document.addEventListener("DOMContentLoaded", function() {
    // Cargar horarios para los instructores
    HorariosModule.cargarHorarios();

    // Obtener el rol del usuario desde localStorage
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    const rol = usuarioActual ? usuarioActual.rolUsuario : 'Instructor'; // Si no hay usuario, asumimos que es 'Instructor'

    // Mostrar la lista de solicitudes solo si el rol es Administrador
    if (rol === "Administrador") {
        HorariosModule.mostrarSolicitudes("Administrador");
    }

    // Asociar el evento de envío del formulario
    document.getElementById("form-cambio").addEventListener("submit", function(event) {
        HorariosModule.enviarSolicitud(event);
    });
});
