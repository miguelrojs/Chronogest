document.addEventListener('DOMContentLoaded', function () {
    // Recupera los datos del usuario actual del localStorage
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));

    if (usuarioActual) {
        // Muestra los datos en el perfil de usuario
        document.getElementById('nombreUsuario').textContent = usuarioActual.usuario;
        document.getElementById('rolUsuario').textContent = usuarioActual.rolUsuario;
        document.getElementById('correoUsuario').textContent = usuarioActual.correo;
    } else {
        // Si no hay usuario actual, redirige al inicio de sesión
        console.log('No hay usuario logueado');
        window.location.href = '/index.html';
        return;
    }

    // Cargar usuarios si el checkbox está marcado
    document.getElementById('activarListaU').addEventListener('change', function() {
        if (this.checked) {
            cargarUsuarios();
        }
    });

    // Carga y muestra los permisos del usuario actual con la nueva estructura desplegable
    cargarPermisosConExpansion();
    
    // Detectar la URL actual de la página
    const currentPage = window.location.pathname;

    // Seleccionar todos los enlaces en el nav
    const links = document.querySelectorAll('nav a');

    // Iterar sobre los enlaces
    links.forEach(link => {
        // Si la URL del enlace coincide con la página actual, añadir la clase 'active'
        if (link.href.includes(currentPage)) {
            link.classList.add('active');
        }
    });
});

// Función para cargar la lista de usuarios
function cargarUsuarios() {
    const usuariosList = document.getElementById('usuariosList');
    usuariosList.innerHTML = ''; // Limpiar lista
    
    // Obtener usuarios desde localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    if (usuarios.length === 0) {
        usuariosList.innerHTML = '<li>No hay usuarios registrados</li>';
        return;
    }
    
    // Agrega cada usuario a la lista
    usuarios.forEach(usuario => {
        const userElement = document.createElement('li');
        userElement.innerHTML = `
            <div>
                <strong>${usuario.usuario}</strong> - ${usuario.rolUsuario}
                <p>${usuario.correo}</p>
            </div>
        `;
        usuariosList.appendChild(userElement);
    });
}

// Función para cargar y mostrar los permisos con la nueva funcionalidad de expansión
function cargarPermisosConExpansion() {
    const menuPermisos = document.getElementById('menuPermisos');
    menuPermisos.innerHTML = ''; // Limpiar el contenedor de permisos
    
    // Obtener el usuario actual y sus permisos
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    
    if (!usuarioActual || !usuarioActual.permisos || usuarioActual.permisos.length === 0) {
        // Mostrar mensaje si no tiene permisos
        const mensaje = document.createElement('p');
        mensaje.textContent = 'No tienes permisos asignados.';
        mensaje.style.textAlign = 'center';
        mensaje.style.color = '#666';
        mensaje.style.padding = '2rem';
        menuPermisos.appendChild(mensaje);
        return;
    }

    // Mapeo de nombres de permisos a textos más amigables
    const nombresPermisos = {
        'registrar': 'Registrar Usuarios',
        'gestionar': 'Gestionar Usuarios',
        'crearHorarios': 'Crear Horarios', 
        'visualizarHorarios': 'Visualizar Horarios',
        'horarioAprendiz': 'Horario Aprendiz',
        'horarioInstructor': 'Horario Instructor',
        'revisarSolicitudes': 'Revisar Solicitudes',
        'editarHorarios': 'Editar Horarios',
        'perfil': 'Mi Perfil',
        'solicitudesInstructores': 'Solicitudes de Cambio',
        'permisosMenu': 'Gestionar Permisos'
    };
    
    // URLs para cada permiso
    const menuURLs = {
        'registrar': '../html/registro.html',
        'gestionar': '../html/gestion-usuarios',
        'crearHorarios': '/Assets/html/crear-horarios.html',
        'visualizarHorarios': '/Assets/html/visualizar-horarios.html',
        'horarioAprendiz': '/Assets/html/horario-aprendiz.html',
        'horarioInstructor': '/Assets/html/horario-instructor.html',
        'revisarSolicitudes': '/Assets/html/revisar-solicitudes.html',
        'editarHorarios': '/Assets/html/editar-horarios.html',
        'perfil': '/Assets/html/perfil-usuario.html',
        'solicitudesInstructores': '/Assets/html/solicitudes-cambio.html',
        'permisosMenu': '../html/registro.html'
    };

    // Descripción de cada permiso para mostrar en el contenido expandible
    const descripcionesPermisos = {
        'registrar': ['Crear nuevos usuarios en el sistema', 'Asignar roles a los usuarios', 'Establecer permisos iniciales'],
        'gestionar': ['Ver todos los usuarios', 'Modificar datos de usuarios', 'Activar o desactivar usuarios', 'Cambiar roles'],
        'crearHorarios': ['Definir bloques de horarios', 'Asignar instructores', 'Establecer aulas y ambientes'],
        'visualizarHorarios': ['Ver horarios de todos los grupos', 'Consultar disponibilidad', 'Exportar horarios'],
        'horarioAprendiz': ['Ver tu horario personal', 'Recibir notificaciones de cambios'],
        'horarioInstructor': ['Ver tus clases asignadas', 'Consultar tu agenda semanal'],
        'revisarSolicitudes': ['Aprobar o rechazar solicitudes', 'Enviar notificaciones', 'Ver historial de cambios'],
        'editarHorarios': ['Modificar horarios existentes', 'Realizar cambios de emergencia', 'Actualizar asignaciones'],
        'perfil': ['Modificar tus datos personales', 'Cambiar contraseña', 'Actualizar preferencias'],
        'solicitudesInstructores': ['Solicitar cambios de horario', 'Justificar solicitudes', 'Ver estado de solicitudes'],
        'permisosMenu': ['Asignar permisos por rol', 'Crear nuevos roles', 'Gestionar accesos al sistema']
    };
    
    // Crear elementos para cada permiso
    usuarioActual.permisos.forEach((permiso, index) => {
        if (menuURLs[permiso]) {
            // Crear contenedor para el permiso
            const permisoItem = document.createElement('div');
            permisoItem.className = 'permiso-item';
            
            // Crear checkbox para toggle
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `permiso${index}`;
            checkbox.className = 'permiso-toggle';
            
            // Crear label/botón para el permiso
            const label = document.createElement('label');
            label.htmlFor = `permiso${index}`;
            label.className = 'permiso-boton';
            label.textContent = nombresPermisos[permiso] || permiso;
            
            // Crear contenedor para el contenido del permiso
            const contenido = document.createElement('div');
            contenido.className = 'permiso-contenido';
            
            // Crear lista de descripción del permiso
            const lista = document.createElement('ul');
            
            // Agregar descripciones del permiso si existen
            if (descripcionesPermisos[permiso] && descripcionesPermisos[permiso].length > 0) {
                descripcionesPermisos[permiso].forEach(desc => {
                    const item = document.createElement('li');
                    item.textContent = desc;
                    lista.appendChild(item);
                });
            } else {
                const item = document.createElement('li');
                item.textContent = 'Acceso a funcionalidad de ' + (nombresPermisos[permiso] || permiso);
                lista.appendChild(item);
            }
            
            // Crear botón de acceso a la funcionalidad
            const botonAcceso = document.createElement('a');
            botonAcceso.href = menuURLs[permiso];
            botonAcceso.className = 'boton-acceso';
            botonAcceso.textContent = 'Ir a ' + (nombresPermisos[permiso] || permiso);
            
            // Agregar la lista y el botón al contenido
            contenido.appendChild(lista);
            contenido.appendChild(botonAcceso);
            
            // Ensamblar todo el item de permiso
            permisoItem.appendChild(checkbox);
            permisoItem.appendChild(label);
            permisoItem.appendChild(contenido);
            
            // Agregar el permiso al menú
            menuPermisos.appendChild(permisoItem);
        }
    });
}
