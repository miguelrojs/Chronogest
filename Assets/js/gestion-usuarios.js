  document.addEventListener('DOMContentLoaded', function () {
    const currentPage = window.location.pathname;

    // Verificar si estamos en la página de "inf-permisosmenu.html"
    if (currentPage.includes('inf-permisosmenu.html')) {
        console.log("Página de gestión de usuarios detectada");

        // Obtener el contenedor donde se mostrarán los usuarios
        const listaUsuarios = document.getElementById('usuariosLista');
        if (!listaUsuarios) {
            console.error("No se encontró el contenedor #usuariosLista");
            return;
        }

        // Obtener los usuarios desde localStorage
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        console.log("Usuarios encontrados:", usuarios);

        // Si no hay usuarios, mostrar un mensaje
        if (usuarios.length === 0) {
            listaUsuarios.innerHTML = "<p>No hay usuarios registrados.</p>";
            return;
        }

        // Si hay usuarios, mostrar la lista
        const ul = document.createElement('ul');
        usuarios.forEach(usuario => {
            const li = document.createElement('li');
            li.textContent = `${usuario.nombre} (${usuario.rolUsuario}) - ${usuario.correo}`;
            ul.appendChild(li);
        });

        listaUsuarios.appendChild(ul);
    }
});
