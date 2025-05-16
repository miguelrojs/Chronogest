    document.addEventListener('DOMContentLoaded', function () {
    const currentPage = window.location.pathname;
    console.log("JS cargado - Página actual:", currentPage);

    // ==========================
    // Función para mostrar las descripciones
    // ==========================
    function showDescription(id) {
        // Ocultar todas las descripciones
        document.querySelectorAll('.description-card').forEach(card => {
            card.classList.add('hidden');
        });

        // Eliminar la clase active de todos los elementos del menú
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });

        // Mostrar la descripción seleccionada
        const description = document.getElementById(id);
        if (description) {
            description.classList.remove('hidden');
        }

        // Actualizar el título del contenido
        const menuItem = Array.from(document.querySelectorAll('.menu-item')).find(
            item => item.getAttribute('onclick') && item.getAttribute('onclick').includes(id)
        );
        if (menuItem) {
            document.getElementById('content-title').textContent = menuItem.textContent.trim();

            // Activar el elemento del menú seleccionado
            menuItem.classList.add('active');
        }
    }

    // ==========================
    // Gestión de usuarios: mostrar en HTML
    // ==========================
    if (currentPage.includes('menupermisos.html')) {
        console.log("Página de gestión de usuarios detectada");

        const listaUsuarios = document.getElementById('usuariosLista');
        if (!listaUsuarios) {
            console.error("No se encontró el contenedor #usuariosLista");
            return;
        }

        // Recuperamos los usuarios almacenados en el localStorage
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        console.log("Usuarios encontrados:", usuarios);

        // Si no hay usuarios, mostramos un mensaje
        if (usuarios.length === 0) {
            listaUsuarios.innerHTML = "<p>No hay usuarios registrados.</p>";
            return;
        }

        // Si hay usuarios, los mostramos en la lista
        const ul = document.createElement('ul');
        usuarios.forEach(usuario => {
            const li = document.createElement('li');
            li.textContent = `${usuario.nombre} (${usuario.rolUsuario}) - ${usuario.correo}`;
            ul.appendChild(li);
        });

        listaUsuarios.appendChild(ul);
    }
});
