document.addEventListener('DOMContentLoaded', function() {
    // Toggle del contenido del menú "Gestionar Usuarios"
    const gestionarHeader = document.querySelector('.gest-menu-header');
    const gestionarContent = document.querySelector('.gest-menu-content');

    if (gestionarHeader && gestionarContent) {
        gestionarContent.style.display = 'none'; // Ocultar inicialmente

        gestionarHeader.addEventListener('click', () => {
            if (gestionarContent.style.display === 'none') {
                gestionarContent.style.display = 'block';
                gestionarHeader.classList.add('active');
            } else {
                gestionarContent.style.display = 'none';
                gestionarHeader.classList.remove('active');
            }
        });
    }

    // Cargar lista de usuarios dentro del contenedor con clase gest-usuariosList
    const listaUsuarios = document.querySelector('.gest-usuariosList');  

    if (!listaUsuarios) {
        console.error("No se encontró el contenedor con clase .gest-usuariosList");
        return;
    }

    // Obtener usuarios desde localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Comprobar si hay usuarios registrados
    if (usuarios.length === 0) {
        listaUsuarios.innerHTML = "<p>No hay usuarios registrados.</p>";
        return;
    }

    // Crear la lista de usuarios y mostrarla
    const ul = document.createElement('ul');
    
    usuarios.forEach((usuario, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="usuario-info">
                <strong>${usuario.nombre} (${usuario.rolUsuario}) - ${usuario.correo}</strong>
                <button onclick="editarUsuario(${index})">Modificar</button>
                <button onclick="activarDesactivarUsuario(${index})">${usuario.activado ? 'Desactivar' : 'Activar'}</button>
                <button onclick="cambiarRol(${index})">Cambiar Rol</button>
            </div>
        `;
        ul.appendChild(li);
    });

    listaUsuarios.appendChild(ul);
});

// Funciones existentes para editar, activar/desactivar y cambiar rol
function editarUsuario(index) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios[index];

    const nuevoNombre = prompt('Nuevo nombre de usuario:', usuario.nombre);
    if (nuevoNombre) {
        usuario.nombre = nuevoNombre;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert('Nombre actualizado correctamente');
        location.reload();
    }
}

function activarDesactivarUsuario(index) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios[index];

    usuario.activado = !usuario.activado;
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert(usuario.activado ? 'Usuario activado' : 'Usuario desactivado');
    location.reload();
}

function cambiarRol(index) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios[index];

    const nuevoRol = prompt('Nuevo rol de usuario:', usuario.rolUsuario);
    if (nuevoRol) {
        usuario.rolUsuario = nuevoRol;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert('Rol actualizado correctamente');
        location.reload();
    }
}
