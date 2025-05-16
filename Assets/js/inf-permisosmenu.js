// Función para mostrar las descripciones correspondientes
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

