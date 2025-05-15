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
                usuariosContainer.innerHTML = '<div class="mensaje error">No hay usuarios registrados.</div>';
                usuariosContainer.classList.add('empty');
            } else {
                usuariosContainer.classList.remove('empty');
                usuarios.forEach((usuario, index) => {
                    const userDiv = document.createElement('div');
                    userDiv.classList.add('usuario');

                    // Formatear los permisos para mejor visualización
                    let permisosTexto = '';
                    if (usuario.permisos && usuario.permisos.length > 0) {
                        permisosTexto = usuario.permisos.join(', ');
                    } else {
                        permisosTexto = 'Sin permisos asignados';
                    }

                    userDiv.innerHTML = `
                        <p><strong>Nombre:</strong> ${usuario.nombre || 'No especificado'}</p>
                        <p><strong>Usuario:</strong> ${usuario.usuario || 'No especificado'}</p>
                        <p><strong>Correo:</strong> ${usuario.correo || 'No especificado'}</p>
                        <p><strong>Rol:</strong> ${usuario.rolUsuario || 'No especificado'}</p>
                        <p><strong>Teléfono:</strong> ${usuario.telefono || 'No especificado'}</p>
                        <p><strong>Documento:</strong> ${usuario.tipoDocumento || 'No especificado'} - ${usuario.numeroDocumento || 'No especificado'}</p>
                        <p><strong>Permisos:</strong> ${permisosTexto}</p>
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
                        // Guardar información del usuario que se va a eliminar para mostrar mensaje
                        const usuarioEliminado = usuarios[index].nombre;
                        
                        usuarios.splice(index, 1); // Eliminar el usuario de la lista

                        // Guardar la lista actualizada en el localStorage
                        localStorage.setItem('usuarios', JSON.stringify(usuarios));

                        // Mostrar mensaje de éxito antes de recargar
                        const mensaje = document.createElement('div');
                        mensaje.className = 'mensaje exito';
                        mensaje.textContent = `Usuario "${usuarioEliminado}" eliminado correctamente`;
                        document.querySelector('.container').insertBefore(mensaje, usuariosContainer);
                        
                        // Recargar la página después de mostrar el mensaje
                        setTimeout(() => {
                            window.location.reload();
                        }, 1500);
                    }
                });
            });
        }
    }
});
