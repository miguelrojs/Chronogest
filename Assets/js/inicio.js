// Script integrado - Adaptación con funcionalidad de menús desplegables

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

    // Configurar el botón checkbox para mostrar/ocultar usuarios
    const checkboxUsuarios = document.getElementById('activarListaU');
    const usuariosList = document.getElementById('usuariosList');
    
    if (checkboxUsuarios && usuariosList) {
        // Ocultar la lista de usuarios inicialmente
        usuariosList.style.display = 'none';
        
        // Añadir evento al checkbox
        checkboxUsuarios.addEventListener('change', function() {
            if (this.checked) {
                // Mostrar la lista y cargar los usuarios
                cargarUsuarios();
                usuariosList.style.display = 'block';
            } else {
                // Ocultar la lista
                usuariosList.style.display = 'none';
            }
        });
    }

    // Carga y muestra los permisos del usuario actual con la nueva estructura HTML
    cargarPermisosHTML();
    
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
    
    // Inicializar la funcionalidad de expansión para los menús
    inicializarExpansionMenus();
});

// Función para cargar la lista de usuarios
function cargarUsuarios() {
    const usuariosList = document.getElementById('usuariosList');
    if (!usuariosList) return;
    
    usuariosList.innerHTML = ''; // Limpiar lista
    
    // Obtener usuarios desde localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    if (usuarios.length === 0) {
        usuariosList.innerHTML = '<li class="usuario-item">No hay usuarios registrados</li>';
        return;
    }
    
    // Agrega cada usuario a la lista
    usuarios.forEach(usuario => {
        const userElement = document.createElement('li');
        userElement.className = 'usuario-item';
        userElement.innerHTML = `
            <div class="usuario-info">
                <strong>${usuario.usuario}</strong> - ${usuario.rolUsuario}
                <p>${usuario.correo}</p>
            </div>
        `;
        usuariosList.appendChild(userElement);
    });
}

// La función original se mantiene intacta por si necesitas usarla en algún momento
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
        'gestionar': '../html/gestion-usuarios.html',
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

// Nueva función que crea los menús con estructura HTML en lugar de generarlos con JavaScript
function cargarPermisosHTML() {
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

    // Usar los mapeos existentes de nombres, URLs y descripciones
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
    
    // URLs para cada permiso (usar las rutas de tu código original)
    const menuURLs = {
        'registrar': '../html/registro.html',
        'gestionar': '../html/gestion-usuarios.html',
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
    
    // Crear el contenedor principal para la nueva estructura
    const menuContainer = document.createElement('div');
    menuContainer.className = 'menu-container';
    
    // Crear elementos HTML para cada permiso
    usuarioActual.permisos.forEach((permiso) => {
        if (menuURLs[permiso]) {
            // Crear elemento de menú
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.setAttribute('data-permiso', permiso);
            
            // Crear encabezado del menú
            const menuHeader = document.createElement('div');
            menuHeader.className = 'menu-header';
            menuHeader.innerHTML = `
                ${nombresPermisos[permiso] || permiso}
                <span class="icon">▼</span>
            `;
            
            // Crear contenido del menú
            const menuContent = document.createElement('div');
            menuContent.className = 'menu-content';
            
            // Crear lista de descripciones
            const descList = document.createElement('ul');
            descList.className = 'menu-description';
            
            // Agregar items de descripción
            if (descripcionesPermisos[permiso] && descripcionesPermisos[permiso].length > 0) {
                descripcionesPermisos[permiso].forEach(desc => {
                    const li = document.createElement('li');
                    li.textContent = desc;
                    descList.appendChild(li);
                });
            } else {
                const li = document.createElement('li');
                li.textContent = 'Acceso a funcionalidad de ' + (nombresPermisos[permiso] || permiso);
                descList.appendChild(li);
            }
            
            // Agregar la lista al contenido
            menuContent.appendChild(descList);
            
            // Crear botón de acceso
            const buttonLink = document.createElement('a');
            buttonLink.href = menuURLs[permiso];
            
            const button = document.createElement('button');
            button.className = 'menu-button';
            button.textContent = 'Acceder';
            
            // Agregar el botón al enlace
            buttonLink.appendChild(button);
            
            // Ensamblar el elemento de menú
            menuItem.appendChild(menuHeader);
            menuItem.appendChild(menuContent);
            menuItem.appendChild(buttonLink);
            
            // Agregar el item al contenedor
            menuContainer.appendChild(menuItem);
        }
    });
    
    // Agregar el contenedor al menú principal
    menuPermisos.appendChild(menuContainer);
}

// Función para inicializar la funcionalidad de expansión de los menús
function inicializarExpansionMenus() {
    const menuHeaders = document.querySelectorAll('.menu-header');
    
    if (menuHeaders && menuHeaders.length > 0) {
        menuHeaders.forEach(header => {
            header.addEventListener('click', function() {
                // Obtener el contenido siguiente (menu-content)
                const content = this.nextElementSibling;
                
                // Obtener el icono dentro del header
                const icon = this.querySelector('.icon');
                
                // Alternar la clase active para mostrar/ocultar el contenido
                if (content) {
                    content.classList.toggle('active');
                }
                
                // Alternar la clase active para rotar el icono
                if (icon) {
                    icon.classList.toggle('active');
                }
            });
        });
    }
}

// Función para mostrar sólo los menús permitidos según el rol del usuario
// Esta función se mantiene pero no se usa automáticamente, por si quieres filtrar permisos en el futuro
function mostrarMenusPermitidos(permisos) {
    // Ocultar todos los elementos del menú primero
    document.querySelectorAll('.menu-item').forEach(item => {
        item.style.display = 'none';
    });
    
    // Mostrar solo los elementos permitidos
    permisos.forEach(permiso => {
        const menuItem = document.querySelector(`.menu-item[data-permiso="${permiso}"]`);
        if (menuItem) {
            menuItem.style.display = 'block';
        }
    });
}

// Función para filtrar menús según los permisos del usuario
function filtrarMenusPorPermisos() {
    // Obtener el usuario actual y sus permisos
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    
    if (!usuarioActual || !usuarioActual.permisos || usuarioActual.permisos.length === 0) {
        // Si no hay permisos, ocultar todos los elementos
        document.querySelectorAll('.menu-item').forEach(item => {
            item.style.display = 'none';
        });
        
        // Mostrar mensaje si no tiene permisos
        const menuPermisos = document.getElementById('menuPermisos');
        if (menuPermisos) {
            const mensaje = document.createElement('p');
            mensaje.textContent = 'No tienes permisos asignados.';
            mensaje.style.textAlign = 'center';
            mensaje.style.color = '#666';
            mensaje.style.padding = '2rem';
            menuPermisos.appendChild(mensaje);
        }
        return;
    }
    
    // Ocultar todos los elementos del menú primero
    document.querySelectorAll('.menu-item').forEach(item => {
        item.style.display = 'none';
    });
    
    // Mostrar solo los elementos que el usuario tiene permiso
    usuarioActual.permisos.forEach(permiso => {
        const menuItem = document.querySelector(`.menu-item[data-permiso="${permiso}"]`);
        if (menuItem) {
            menuItem.style.display = 'block';
        }
    });
}