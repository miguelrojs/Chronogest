// Script para el manejo de permisos y navegación en el sistema Chronogest

// Evento que se ejecuta cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', function() {
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

    // Si estamos en la página de registro, configurar los botones de navegación rápida
    if (currentPage.includes('registro.html') || currentPage.includes('registro-usuarios.html')) {
        // Crear botones de navegación al lado de cada checkbox
        document.querySelectorAll('#llenarCampos input[type="checkbox"]').forEach(checkbox => {
            const id = checkbox.id;
            if (!id) return;
            
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
            
            if (menuURLs[id]) {
                // Crear un botón y colocarlo después del checkbox
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'nav-btn';
                button.textContent = 'Ir';
                button.style.marginLeft = '10px';
                button.style.padding = '2px 8px';
                button.style.fontSize = '12px';
                button.style.backgroundColor = '#4CAF50';
                button.style.color = 'white';
                button.style.border = 'none';
                button.style.borderRadius = '4px';
                button.style.cursor = 'pointer';
                
                // Añadir evento al botón
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.location.href = menuURLs[id];
                });
                
                // Insertar el botón después del checkbox
                checkbox.parentNode.insertBefore(button, checkbox.nextSibling);
            }
        });

        // Código para el formulario de registro
        document.getElementById('llenarCampos').addEventListener('submit', function(event) {
            event.preventDefault();

            //Se validan los permisos asignados al usuario
            const permisosSeleccionados = [];
            document.querySelectorAll('#llenarCampos input[type="checkbox"]').forEach(cb => {
                if (cb.checked){
                    permisosSeleccionados.push(cb.id);
                }
            });

            // Se crea el objeto de usuario con los datos del formulario
            let nuevoUsuario = {
                nombre: document.getElementById('nombre').value,
                usuario: document.getElementById('nombreUsuario').value,
                telefono: document.getElementById('numeroTelefono').value,
                correo: document.getElementById('correo').value,
                contraseña: document.getElementById('contraseña').value,
                tipoDocumento: document.getElementById('tiposDocumentos').value,
                numeroDocumento: document.getElementById('numeroDocumento').value,
                rolUsuario: document.getElementById('roles').value,
                permisos: permisosSeleccionados
            };

            // Recupera los usuarios que ya están creados
            let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

            // Verifica si ya existe un usuario con ese correo
            if (usuarios.some(u => u.correo === nuevoUsuario.correo)) {
                alert("Ya existe un usuario con ese correo.");
                return;
            }

            // Añade el nuevo usuario al array de usuarios
            usuarios.push(nuevoUsuario);

            // Guarda el array actualizado en localStorage
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            // Almacena el usuario para la sesión actual
            localStorage.setItem('usuarioActual', JSON.stringify(nuevoUsuario));

            // Redirige al usuario a la página de inicio
           window.location.href = '../html/inicio.html';
        });
    }
});

// Detecta la URL actual de la página
const currentPage = window.location.pathname;

// Selecciona todos los enlaces en el nav
const links = document.querySelectorAll('nav a');

// Itera sobre los enlaces
links.forEach(link => {
    // Si la URL del enlace coincide con la página actual, añade la clase 'active'
    if (link.href.includes(currentPage)) {
        link.classList.add('active');
    }
});
