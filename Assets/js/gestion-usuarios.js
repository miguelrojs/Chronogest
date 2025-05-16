 document.addEventListener('DOMContentLoaded', function () {
    const listaUsuarios = document.getElementById('usuariosLista');  // Obtener el contenedor de la lista de usuarios

    if (!listaUsuarios) {
        console.error("No se encontró el contenedor #usuariosLista");
        return;
    }

    // Obtener el usuario actual desde localStorage
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));

    // Comprobar si hay un usuario actual
    if (!usuarioActual) {
        listaUsuarios.innerHTML = "<p>No hay usuarios registrados.</p>";
        return;
    }

    // Mostrar el usuario actual
    const ul = document.createElement('ul');
    const li = document.createElement('li');
    li.textContent = `${usuarioActual.nombre} (${usuarioActual.rolUsuario}) - ${usuarioActual.correo}`;  // Mostrar nombre, rol y correo
    ul.appendChild(li);

    // Añadir la lista de usuarios al contenedor
    listaUsuarios.appendChild(ul);
});
