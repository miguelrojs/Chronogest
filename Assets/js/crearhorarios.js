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

function cargarPermisosConExpansion() {
    const menuPermisos = document.getElementById('menuPermisos');
    menuPermisos.innerHTML = ''; // Limpiar el contenedor de permisos
    
    
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
            

            // Agregar el permiso al menú
            menuPermisos.appendChild(permisoItem);
        }
    });
}

//función que crea los menus 
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
        const  descripcionesPermisos= {
        'registrar': [],
        'gestionar': [],
        'crearHorarios': [],
        'visualizarHorarios': [],
        'horarioAprendiz': [],
        'horarioInstructor': [],
        'revisarSolicitudes': [],
        'editarHorarios': [],
        'perfil': [],
        'solicitudesInstructores': [],
        'permisosMenu': [],
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
/**
 * Función para inicializar la navegación del menú lateral
 * Esta función hace que el contenido aparezca en el área principal en lugar de dentro del menú
 */
function inicializarNavegacionMenu() {
    // Seleccionar todos los elementos del menú con atributo data-permiso
    const menuItems = document.querySelectorAll('.menu-item[data-permiso]');
    
    // Área principal donde se mostrará el contenido (asumimos que existe o la creamos)
    let mainContentArea = document.querySelector('.main-content-area');
    if (!mainContentArea) {
        // Crear el área principal si no existe
        mainContentArea = document.createElement('div');
        mainContentArea.className = 'main-content-area';
        
        // Insertar después del sidebar
        const sidebar = document.querySelector('.sidebar') || document.body;
        sidebar.parentNode.insertBefore(mainContentArea, sidebar.nextSibling);
    }
    
    // Contenedores de contenido para cada elemento del menú
    const contentContainers = {};
    
    // Inicializar: Mover contenido de cada menú al área principal y ocultarlo
    menuItems.forEach(menuItem => {
        const permiso = menuItem.getAttribute('data-permiso');
        const menuHeader = menuItem.querySelector('.menu-header');
        const menuContent = menuItem.querySelector('.menu-content');
        
        if (menuContent && permiso) {
            // Crear un contenedor para este contenido en el área principal
            const contentContainer = document.createElement('div');
            contentContainer.className = 'main-content-container';
            contentContainer.id = `content-${permiso}`;
            contentContainer.style.display = 'none'; // Ocultar inicialmente
            
            // Mover el contenido al nuevo contenedor
            const contentClone = menuContent.cloneNode(true);
            contentContainer.appendChild(contentClone);
            
            // Guardar referencia al contenedor
            contentContainers[permiso] = contentContainer;
            
            // Añadir al área principal
            mainContentArea.appendChild(contentContainer);
            
            // Eliminar el contenido original del menú o mantenerlo vacío
            menuContent.innerHTML = '';
            menuContent.style.height = '0';
        }
        
        // Agregar listener al header del menú
        if (menuHeader && permiso) {
            menuHeader.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Obtener el ícono dentro del header
                const icon = this.querySelector('.icon');
                
                // Toggle active class en el header
                this.classList.toggle('active');
                
                // Mostrar/ocultar el contenido correspondiente en el área principal
                Object.keys(contentContainers).forEach(key => {
                    const container = contentContainers[key];
                    if (key === permiso) {
                        // Toggle para este contenedor
                        if (container.style.display === 'none') {
                            container.style.display = 'block';
                            if (icon) icon.classList.add('active');
                        } else {
                            container.style.display = 'none';
                            if (icon) icon.classList.remove('active');
                        }
                    } else {
                        // Ocultar los demás contenedores
                        container.style.display = 'none';
                        
                        // Desactivar otros íconos
                        const otherItem = document.querySelector(`.menu-item[data-permiso="${key}"]`);
                        if (otherItem) {
                            const otherIcon = otherItem.querySelector('.icon');
                            if (otherIcon) otherIcon.classList.remove('active');
                            
                            const otherHeader = otherItem.querySelector('.menu-header');
                            if (otherHeader) otherHeader.classList.remove('active');
                        }
                    }
                });
            });
        }
    });
}

// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar la navegación del menú
    inicializarNavegacionMenu();
    });
