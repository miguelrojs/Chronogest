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
        alert('No hay usuario logueado. Serás redirigido a la página de inicio de sesión.');
        // window.location.href = '/index.html';
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

    // Información de categorías para agrupar permisos
    const categorias = {
        'usuarios': {
            nombre: 'Gestión de Usuarios',
            permisos: ['registrar', 'gestionar']
        },
        'horarios': {
            nombre: 'Gestión de Horarios',
            permisos: ['crearHorarios', 'visualizarHorarios', 'editarHorarios', 'horarioAprendiz', 'horarioInstructor']
        },
        'solicitudes': {
            nombre: 'Solicitudes',
            permisos: ['revisarSolicitudes', 'solicitudesInstructores']
        },
        'configuracion': {
            nombre: 'Configuración',
            permisos: ['perfil', 'permisosMenu']
        }
    };

    // Contenedor donde se agregarán los botones
    const menuContainer = document.getElementById('menuPermisos');
    menuContainer.innerHTML = ''; // Limpiar el contenedor

    // Función para crear categorías con permisos desplegables
    function crearCategoriasConPermisos() {
        console.log("Iniciando creación de categorías con permisos");

        // Verificar si el usuario tiene permisos
        if (usuarioActual.permisos && usuarioActual.permisos.length > 0) {
            console.log("Usuario tiene permisos:", usuarioActual.permisos);

            // Crear un mapa para verificar rápidamente si el usuario tiene un permiso específico
            const permisosUsuario = {};
            usuarioActual.permisos.forEach(permiso => {
                permisosUsuario[permiso] = true;
            });

            // Para cada categoría, crear un elemento desplegable
            Object.keys(categorias).forEach(catId => {
                const categoria = categorias[catId];

                // Verificar si el usuario tiene al menos un permiso en esta categoría
                const tienePermisosEnCategoria = categoria.permisos.some(permiso => permisosUsuario[permiso]);

                if (tienePermisosEnCategoria) {
                    console.log(`Usuario tiene permisos en categoría ${catId}`);

                    // Crear elemento de lista para la categoría
                    const itemCategoria = document.createElement('li');
                    itemCategoria.className = 'item-permiso';

                    // Crear contenedor para la categoría
                    const categoriaContainer = document.createElement('div');
                    categoriaContainer.className = 'permiso-container';

                    // Crear botón para mostrar/ocultar permisos de esta categoría
                    const botonCategoria = document.createElement('button');
                    botonCategoria.textContent = categoria.nombre;
                    botonCategoria.className = 'boton-permiso';
                    botonCategoria.setAttribute('data-categoria', catId);

                    // Crear contenedor para los permisos (inicialmente oculto)
                    const contenidoCategoria = document.createElement('div');
                    contenidoCategoria.className = 'contenido-permiso';
                    contenidoCategoria.id = `contenido-${catId}`;
                    contenidoCategoria.style.display = 'none';

                    // Agregar los permisos que tiene el usuario a esta categoría
                    categoria.permisos.forEach(permiso => {
                        if (permisosUsuario[permiso]) {
                            console.log(`Usuario tiene permiso: ${permiso}`);

                            // Crear un div para el permiso
                            const permisoDiv = document.createElement('div');
                            permisoDiv.className = 'permiso-item';

                            // Crear el botón principal del permiso
                            const botonPermiso = document.createElement('button');
                            botonPermiso.className = 'btn-permiso';
                            botonPermiso.textContent = nombresPermisos[permiso] || permiso;
                            botonPermiso.setAttribute('data-permiso', permiso);

                            // Si no hay opciones adicionales, el botón principal lleva a la URL
                            botonPermiso.addEventListener('click', function () {
                                window.location.href = menuURLs[permiso];
                            });
                            permisoDiv.appendChild(botonPermiso);

                            // Agregar el div del permiso al contenedor de la categoría
                            contenidoCategoria.appendChild(permisoDiv);
                        }
                    });

                    // Agregar evento para mostrar/ocultar permisos de esta categoría
                    botonCategoria.addEventListener('click', function () {
                        const contenidoElement = document.getElementById(`contenido-${catId}`);
                        contenidoElement.style.display = contenidoElement.style.display === 'none' ? 'block' : 'none';
                    });

                    // Agregar elementos al DOM
                    categoriaContainer.appendChild(botonCategoria);
                    itemCategoria.appendChild(categoriaContainer);
                    itemCategoria.appendChild(contenidoCategoria);
                    menuContainer.appendChild(itemCategoria);
                }
            });
        } else {
            // Mostrar mensaje si no tiene permisos
            console.log("Usuario no tiene permisos");
            const mensaje = document.createElement('p');
            mensaje
