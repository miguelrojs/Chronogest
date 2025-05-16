  document.addEventListener('DOMContentLoaded', function () {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];  // Cargar usuarios desde localStorage

    const listaUsuarios = document.getElementById('usuariosLista');  // Obtener el contenedor de la lista de usuarios

    if (!listaUsuarios) {
        console.error("No se encontró el contenedor #usuariosLista");
        return;
    }

    // Si no hay usuarios en el localStorage, mostrar un mensaje
    if (usuarios.length === 0) {
        listaUsuarios.innerHTML = "<p>No hay usuarios registrados.</p>";
        return;
    }

    // Crear una lista de usuarios
    const ul = document.createElement('ul');
    usuarios.forEach(usuario => {
        const li = document.createElement('li');
        li.textContent = `${usuario.nombre} (${usuario.rolUsuario}) - ${usuario.correo}`;  // Mostrar nombre, rol y correo
        ul.appendChild(li);
    });

    // Añadir la lista de usuarios al contenedor
    listaUsuarios.appendChild(ul);
});
