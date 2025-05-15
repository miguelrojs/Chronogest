// Script para el manejo de permisos, navegación y gestión de usuarios en el sistema Chronogest

document.addEventListener('DOMContentLoaded', function () {
    const currentPage = window.location.pathname;
    console.log("JS cargado - Página actual:", currentPage);

    // ==========================
    // Navegación en el menú
    // ==========================
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        if (link.href.includes(currentPage)) {
            link.classList.add('active');
        }
    });

    // ==========================
    // Registro de usuarios
    // ==========================
    if (currentPage.includes('registro.html') || currentPage.includes('registro-usuarios.html')) {
        console.log("Página de registro detectada");

        document.querySelectorAll('#llenarCampos input[type="checkbox"]').forEach(checkbox => {
            const id = checkbox.id;
            if (!id) return;

            const menuURLs = {
                'registrar': '../html/inf-registrousuarios.html',
                'gestionar': '../html/inf-gestionarusuarios.html',
                'crearHorarios': '../html/inf-crearhorario.html',
                'visualizarHorarios': '../html/inf-visualizarhorarios.html',
                'horarioAprendiz': '../html/inf-horarioaprendiz.html',
                'horarioInstructor': '../html/inf-horarioinstructor.html',
                'revisarSolicitudes': '../html/inf-revisarsolicitudes.html',
                'editarHorarios': '../html/inf-editarhorarios.html',
                'perfil': '../html/inf-perfil.html',
                'solicitudesInstructores': '../html/inf-solicitudesinstructores.html',
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
                button.style.backgroundColor = '#4CAF50';
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

            usuarios.push(nuevoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            localStorage.setItem('usuarioActual', JSON.stringify(nuevoUsuario));

            console.log("Usuario registrado:", nuevoUsuario);

            window.location.href = 'inicio.html';
        });
    }

    // ==========================
    // Gestión de usuarios: mostrar en HTML
    // ==========================
    if (currentPage.includes('gestion-usuarios.html')) {
        console.log("Página de gestión de usuarios detectada");

        const listaUsuarios = document.getElementById('usuariosLista');
        if (!listaUsuarios) {
            console.error("No se encontró el contenedor #usuariosLista");
            return;
        }

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        console.log("Usuarios encontrados:", usuarios);

        if (usuarios.length === 0) {
            listaUsuarios.innerHTML = "<p>No hay usuarios registrados.</p>";
            return;
        }

        const ul = document.createElement('ul');
        usuarios.forEach(usuario => {
            const li = document.createElement('li');
            li.textContent = `${usuario.nombre} (${usuario.rolUsuario}) - ${usuario.correo}`;
            ul.appendChild(li);
        });

        listaUsuarios.appendChild(ul);
    }
});
