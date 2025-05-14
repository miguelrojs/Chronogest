document.addEventListener('DOMContentLoaded', function () {
    const currentPage = window.location.pathname;

    // Lógica para el registro de usuarios
    if (currentPage.includes('registro.html') || currentPage.includes('registro-usuarios.html')) {

        // Botones de navegación junto a cada checkbox
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

            usuarios.push(nuevoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            localStorage.setItem('usuarioActual', JSON.stringify(nuevoUsuario));

            // Redirige a la página de inicio
            window.location.href = 'inicio.html'; // Ruta relativa correcta desde registro.html
        });
    }

    // Lógica para la gestión de usuarios (mostrar y eliminar)
    if (currentPage.includes('gestionarusuarios.html')) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Mostrar los usuarios en la página
        const usuariosContainer = document.getElementById('usuariosLista');
        usuariosContainer.innerHTML = '';  // Limpiar la lista antes de agregar

        usuarios.forEach((usuario, index) => {
            const userDiv = document.createElement('div');
            userDiv.classList.add('usuario');

            userDiv.innerHTML = `
                <p><strong>Nombre:</strong> ${usuario.nombre}</p>
                <p><strong>Correo:</strong> ${usuario.correo}</p>
                <p><strong>Rol:</strong> ${usuario.rolUsuario}</p>
                <p><strong>Teléfono:</strong> ${usuario.telefono}</p>
                <p><strong>Documento:</strong> ${usuario.tipoDocumento} - ${usuario.numeroDocumento}</p>
                <p><strong>Permisos:</strong> ${usuario.permisos.join(', ')}</p>
                <button class="eliminar" data-index="${index}">Eliminar</button>
            `;

            usuariosContainer.appendChild(userDiv);
        });

        // Eliminar usuario
        document.querySelectorAll('.eliminar').forEach(button => {
            button.addEventListener('click', function () {
                const index = button.getAttribute('data-index');
                usuarios.splice(index, 1); // Eliminar el usuario de la lista

                // Guardar la lista actualizada en el localStorage
                localStorage.setItem('usuarios', JSON.stringify(usuarios));

                // Recargar la página para reflejar los cambios
                window.location.reload();
            });
        });
    }
});

