 // Para pruebas: Crear datos de usuario y permisos si no existen
        if (!localStorage.getItem('usuarioActual')) {
            const usuarioActual = {
                usuario: 'Usuario Demo',
                rolUsuario: 'Administrador',
                correo: 'demo@ejemplo.com',
                permisos: [
                    'registrar', 'gestionar', 'crearHorarios', 'visualizarHorarios',
                    'horarioAprendiz', 'perfil', 'permisosMenu'
                ]
            };
            localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));
        }
        
        if (!localStorage.getItem('usuarios')) {
            const usuarios = [
                {
                    usuario: 'Usuario Demo',
                    rolUsuario: 'Administrador',
                    correo: 'demo@ejemplo.com'
                },
                {
                    usuario: 'Instructor 1',
                    rolUsuario: 'Instructor',
                    correo: 'instructor1@ejemplo.com'
                },
                {
                    usuario: 'Aprendiz 1',
                    rolUsuario: 'Aprendiz',
                    correo: 'aprendiz1@ejemplo.com'
                }
            ];
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
        }

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
                                    
                                    // Opciones adicionales para cada permiso (submenú)
                                    const permisosOpciones = {
                                        'registrar': [
                                            { tipo: 'boton', texto: 'Nuevo Usuario', accion: 'crearNuevoUsuario' },
                                            { tipo: 'boton', texto: 'Importar Lista', accion: 'importarUsuarios' }
                                        ],
                                        'gestionar': [
                                            { tipo: 'boton', texto: 'Editar Usuario', accion: 'editarUsuario' },
                                            { tipo: 'boton', texto: 'Eliminar Usuario', accion: 'eliminarUsuario' },
                                            { tipo: 'boton', texto: 'Asignar Rol', accion: 'asignarRol' }
                                        ],
                                        'crearHorarios': [
                                            { tipo: 'enlace', texto: 'Nuevo Horario', url: menuURLs['crearHorarios'] + '?modo=nuevo' },
                                            { tipo: 'enlace', texto: 'Duplicar Horario', url: menuURLs['crearHorarios'] + '?modo=duplicar' }
                                        ],
                                        'visualizarHorarios': [
                                            { tipo: 'enlace', texto: 'Por Instructor', url: menuURLs['visualizarHorarios'] + '?filtro=instructor' },
                                            { tipo: 'enlace', texto: 'Por Aula', url: menuURLs['visualizarHorarios'] + '?filtro=aula' },
                                            { tipo: 'enlace', texto: 'Por Programa', url: menuURLs['visualizarHorarios'] + '?filtro=programa' }
                                        ]
                                        // Puedes añadir más opciones para otros permisos según necesites
                                    };
                                    
                                    // Crear un div para el permiso
                                    const permisoDiv = document.createElement('div');
                                    permisoDiv.className = 'permiso-item';
                                    
                                    // Crear el botón principal del permiso
                                    const botonPermiso = document.createElement('button');
                                    botonPermiso.className = 'btn-permiso';
                                    botonPermiso.textContent = nombresPermisos[permiso] || permiso;
                                    botonPermiso.setAttribute('data-permiso', permiso);
                                    
                                    // Si hay opciones adicionales para este permiso, convertirlo en desplegable
                                    if (permisosOpciones[permiso]) {
                                        // Crear contenedor para opciones (inicialmente oculto)
                                        const opcionesContainer = document.createElement('div');
                                        opcionesContainer.className = 'opciones-permiso';
                                        opcionesContainer.id = `opciones-${permiso}`;
                                        opcionesContainer.style.display = 'none';
                                        
                                        // Agregar las opciones al contenedor
                                        permisosOpciones[permiso].forEach(opcion => {
                                            if (opcion.tipo === 'boton') {
                                                const botonOpcion = document.createElement('button');
                                                botonOpcion.className = 'boton-accion';
                                                botonOpcion.textContent = opcion.texto;
                                                botonOpcion.setAttribute('data-accion', opcion.accion);
                                                botonOpcion.addEventListener('click', function() {
                                                    ejecutarAccion(opcion.accion);
                                                });
                                                opcionesContainer.appendChild(botonOpcion);
                                            } else if (opcion.tipo === 'enlace') {
                                                const enlaceOpcion = document.createElement('a');
                                                enlaceOpcion.className = 'enlace-accion';
                                                enlaceOpcion.textContent = opcion.texto;
                                                enlaceOpcion.href = opcion.url;
                                                opcionesContainer.appendChild(enlaceOpcion);
                                            }
                                        });
                                        
                                        // Agregar evento al botón para mostrar/ocultar opciones
                                        botonPermiso.addEventListener('click', function() {
                                            const opcionesElement = document.getElementById(`opciones-${permiso}`);
                                            if (opcionesElement.style.display === 'none') {
                                                opcionesElement.style.display = 'block';
                                            } else {
                                                opcionesElement.style.display = 'none';
                                            }
                                        });
                                        
                                        // Agregar el contenedor de opciones al div del permiso
                                        permisoDiv.appendChild(botonPermiso);
                                        permisoDiv.appendChild(opcionesContainer);
                                    } else {
                                        // Si no hay opciones adicionales, el botón principal lleva a la URL
                                        botonPermiso.addEventListener('click', function() {
                                            window.location.href = menuURLs[permiso];
                                        });
                                        permisoDiv.appendChild(botonPermiso);
                                    }
                                    
                                    // Agregar el div del permiso al contenedor de la categoría
                                    contenidoCategoria.appendChild(permisoDiv);
                                }
                            });
                            
                            // Agregar evento para mostrar/ocultar permisos de esta categoría
                            botonCategoria.addEventListener('click', function() {
                                const contenidoElement = document.getElementById(`contenido-${catId}`);
                                if (contenidoElement.style.display === 'none') {
                                    contenidoElement.style.display = 'block';
                                } else {
                                    contenidoElement.style.display = 'none';
                                }
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
                    mensaje.textContent = 'No tienes permisos asignados.';
                    mensaje.style.textAlign = 'center';
                    mensaje.style.color = '#666';
                    mensaje.style.padding = '2rem';
                    menuContainer.appendChild(mensaje);
                }
            }
            
            // Función para ejecutar acciones de botones
            function ejecutarAccion(accion) {
                console.log(`Ejecutando acción: ${accion}`);
                // Aquí agregarías la lógica para cada acción específica
                switch(accion) {
                    case 'crearNuevoUsuario':
                        alert('Redirigiendo a formulario de creación de usuario...');
                        // window.location.href = '/Assets/html/registro-usuarios.html?modo=nuevo';
                        break;
                    case 'importarUsuarios':
                        alert('Abriendo herramienta de importación de usuarios...');
                        // Aquí podrías abrir un modal o redirigir a una página específica
                        break;
                    case 'editarUsuario':
                        alert('Seleccione un usuario para editar...');
                        // Aquí podrías abrir un modal de selección de usuario
                        break;
                    case 'eliminarUsuario':
                        alert('Seleccione un usuario para eliminar...');
                        // Aquí podrías abrir un modal de selección de usuario
                        break;
                    case 'asignarRol':
                        alert('Seleccione un usuario para asignar rol...');
                        // Aquí podrías abrir un modal de selección de usuario
                        break;
                    default:
                        console.log('Acción no implementada');
                }
            }
            
            // Inicializar el menú de permisos con categorías
            crearCategoriasConPermisos();
        });
