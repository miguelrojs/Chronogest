
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
    usuarios.forEach(usuario => {
        const li = document.createElement('li');
        li.textContent = `${usuario.nombre} (${usuario.rolUsuario}) - ${usuario.correo}`;  // Mostrar nombre, rol y correo
        ul.appendChild(li);
    });

    // Añadir la lista de usuarios al contenedor
    listaUsuarios.appendChild(ul);
});
