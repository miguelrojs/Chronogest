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

    // Muestra la lista de todos los usuarios registrados
    const usuariosList = document.getElementById('usuariosList');
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Limpia la lista antes de agregar elementos
    usuariosList.innerHTML = '';
    
    // Agrega cada usuario a la lista
    usuarios.forEach(usuario => {
        const userElement = document.createElement('li');
        userElement.textContent = `${usuario.usuario} - ${usuario.rolUsuario} - ${usuario.correo}`;
        usuariosList.appendChild(userElement);
    });
    
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
                'registrar': '/Assets/html/registro-usuarios.html',
                'gestionar': '/Assets/html/gestionar-usuarios.html',
                'crearHorarios': '/Assets/html/crear-horarios.html',
                'visualizarHorarios': '/Assets/html/visualizar-horarios.html',
                'horarioAprendiz': '/Assets/html/horario-aprendiz.html',
                'horarioInstructor': '/Assets/html/horario-instructor.html',
                'revisarSolicitudes': '/Assets/html/revisar-solicitudes.html',
                'editarHorarios': '/Assets/html/editar-horarios.html',
                'perfil': '/Assets/html/perfil-usuario.html',
                'solicitudesInstructores': '/Assets/html/solicitudes-cambio.html',
                'permisosMenu': '/Assets/html/permisos-menu.html'
            };
            
            // Contenedor donde se agregarán los botones
            const menuContainer = document.getElementById('menuPermisos');
            
            // Para cada permiso del usuario, crear un botón
            if (usuarioActual.permisos && usuarioActual.permisos.length > 0) {
                usuarioActual.permisos.forEach(permiso => {
                    if (menuURLs[permiso]) {
                        // Crear botón
                        const boton = document.createElement('button');
                        boton.className = 'btn-permiso';
                        boton.textContent = nombresPermisos[permiso] || permiso;
                        
                        // Añadir evento de clic para navegar
                        boton.addEventListener('click', function() {
                            window.location.href = menuURLs[permiso];
                        });
                        
                        // Añadir botón al contenedor
                        menuContainer.appendChild(boton);
                    }
                });
            } else {
                // Mostrar mensaje si no tiene permisos
                const mensaje = document.createElement('p');
                mensaje.textContent = 'No tienes permisos asignados.';
                mensaje.style.textAlign = 'center';
                mensaje.style.color = '#666';
                mensaje.style.padding = '2rem';
                menuContainer.appendChild(mensaje);
            }
            
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
