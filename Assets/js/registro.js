// Script para el manejo de permisos y navegación en el sistema Chronogest

// Evento que se ejecuta cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    // Detectar la URL actual de la página
    const currentPage = window.location.pathname;

    // Seleccionar todos los enlaces en el nav
    const links = document.querySelectorAll('nav a');

    // Iterar sobre los enlaces y activar el correspondiente
    links.forEach(link => {
        if (link.href.includes(currentPage)) {
            link.classList.add('active');
        }
    });

    // Si estamos en la página de registro, configurar botones y lógica de registro
    if (currentPage.includes('registro.html') || currentPage.includes('registro-usuarios.html')) {
        // Botones de navegación junto a cada checkbox
        document.querySelectorAll('#llenarCampos input[type="checkbox"]').forEach(checkbox => {
            const id = checkbox.id;
            if (!id) return;

            const menuURLs = {
           'registrar': '',
            'gestionar': '',
            'crearHorarios': '',
            'visualizarHorarios': '',
            'horarioAprendiz': '',
            'horarioInstructor': '',
            'revisarSolicitudes': '',
            'editarHorarios': '',
            'perfil': '',
            'solicitudesInstructores': '',
            'permisosMenu': '../html/inf-permisosmenu.html'
            };


            if (menuURLs[id]) {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'nav-btn';
                button.textContent = 'Ir';
                button.style.marginLeft = '10px';
                button.style.padding = '2px 8px';
                button.style.fontSize = '12px';
                button.style.backgroundColor = '#1e3850';
                button.style.color = 'white';
                button.style.border = 'none';
                button.style.borderRadius = '4px';
                button.style.cursor = 'pointer';

                button.addEventListener('click', function (e) {
                    e.preventDefault();
                    window.location.href = menuURLs[id];
                });

                checkbox.parentNode.insertBefore(button, checkbox.nextSibling);
            }
        });

        // Manejo del formulario de registro
        document.getElementById('llenarCampos').addEventListener('submit', function (event) {
            event.preventDefault();

            const permisosSeleccionados = [];
            document.querySelectorAll('#llenarCampos input[type="checkbox"]').forEach(cb => {
                if (cb.checked) {
                    permisosSeleccionados.push(cb.id);
                }
            });

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

            let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

            if (usuarios.some(u => u.correo === nuevoUsuario.correo)) {
                alert("Ya existe un usuario con ese correo.");
                return;
            }

           usuarios.push(nuevoUsuario); // Agrega el nuevo usuario a la lista de usuarios
localStorage.setItem('usuarios', JSON.stringify(usuarios)); // Guarda la lista de usuarios en localStorage
// NO guardar 'usuarioActual' aquí


            // Redirige a la página de inicio
            window.location.href = 'inicio.html'; // Ruta relativa correcta desde registro.html
        });
    }
});
