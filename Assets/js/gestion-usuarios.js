// Script para la gestión de usuarios en el sistema Chronogest
// Este archivo trabaja en conjunto con el script de registro existente

document.addEventListener('DOMContentLoaded', function () {
    // Detectar la URL actual de la página
    const currentPage = window.location.pathname;

    // Lógica específica para la página de gestión de usuarios
    if (currentPage.includes('gestionarusuarios.html')) {
        // Recuperar la lista de usuarios del localStorage (la misma que utiliza el script de registro)
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Mostrar los usuarios en la página
        const usuariosContainer = document.getElementById('usuariosLista');
        if (usuariosContainer) {
            usuariosContainer.innerHTML = ''; // Limpiar la lista antes de agregar

            if (usuarios.length === 0) {
                usuariosContainer.innerHTML = '<p>No hay usuarios registrados.</p>';
            } else {
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
            }

            // Añadir evento para eliminar usuarios
            document.querySelectorAll('.eliminar').forEach(button => {
                button.addEventListener('click', function () {
                    const index = parseInt(button.getAttribute('data-index'));
                    
                    if (confirm('¿Está seguro de eliminar este usuario?')) {
                        usuarios.splice(index, 1); // Eliminar el usuario de la lista

                        // Guardar la lista actualizada en el localStorage
                        localStorage.setItem('usuarios', JSON.stringify(usuarios));

                        // Recargar la página para reflejar los cambios
                        window.location.reload();
                    }
                });
            });
        }
    }
});
