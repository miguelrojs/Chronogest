document.addEventListener('DOMContentLoaded', function () {
    const currentPage = window.location.pathname;

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
