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

        // Inicializar la funcionalidad de expansión para los menús
        inicializarExpansionMenus();
        
        // Mostrar solo los permisos que el usuario tiene
        filtrarMenusPorPermisos();
        
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

    // Función para cargar la lista de usuarios (mantenida igual)
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

    // Función para inicializar la funcionalidad de expansión de los menús
    function inicializarExpansionMenus() {
        document.querySelectorAll('.menu-header').forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                const icon = header.querySelector('.icon');
                
                content.classList.toggle('active');
                icon.classList.toggle('active');
            });
        });
    }

    // Nueva función para filtrar menús según los permisos del usuario
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
            const mensaje = document.createElement('p');
            mensaje.textContent = 'No tienes permisos asignados.';
            mensaje.style.textAlign = 'center';
            mensaje.style.color = '#666';
            mensaje.style.padding = '2rem';
            menuPermisos.appendChild(mensaje);
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