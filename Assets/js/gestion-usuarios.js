document.addEventListener('DOMContentLoaded', function() {
    const listaUsuarios = document.getElementById('usuariosLista');  // Obtener el contenedor de la lista de usuarios

    if (!listaUsuarios) {
        console.error("No se encontró el contenedor #usuariosLista");
        return;
    }

    // Obtener todos los usuarios desde localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Comprobar si hay usuarios registrados
    if (usuarios.length === 0) {
        listaUsuarios.innerHTML = "<p>No hay usuarios registrados.</p>";
        return;
    }

    // Crear la lista de usuarios y mostrarla
    const ul = document.createElement('ul');
    
    // Itera sobre todos los usuarios en localStorage
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

    // Añadir la lista de usuarios al contenedor
    listaUsuarios.appendChild(ul);
});

// Función para modificar datos de un usuario
function editarUsuario(index) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios[index];

    const nuevoNombre = prompt('Nuevo nombre de usuario:', usuario.nombre);
    if (nuevoNombre) {
        usuario.nombre = nuevoNombre;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert('Nombre actualizado correctamente');
        location.reload();  // Recargar la página para reflejar los cambios
    }
}

// Función para activar o desactivar un usuario
function activarDesactivarUsuario(index) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios[index];

    usuario.activado = !usuario.activado;
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert(usuario.activado ? 'Usuario activado' : 'Usuario desactivado');
    location.reload();  // Recargar la página para reflejar los cambios
}

// Función para cambiar el rol de un usuario
function cambiarRol(index) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios[index];

    const nuevoRol = prompt('Nuevo rol de usuario:', usuario.rolUsuario);
    if (nuevoRol) {
        usuario.rolUsuario = nuevoRol;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert('Rol actualizado correctamente');
        location.reload();  // Recargar la página para reflejar los cambios
    }
}
