// gestion-usuarios.js

// Cargar los usuarios almacenados en LocalStorage al cargar la página
document.addEventListener('DOMContentLoaded', loadUsers);

// Manejar el envío del formulario para agregar un usuario
document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const userName = document.getElementById('userName').value;
    const userEmail = document.getElementById('userEmail').value;

    const user = { name: userName, email: userEmail };

    // Obtener usuarios existentes del LocalStorage, o inicializar un array vacío
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Agregar el nuevo usuario
    users.push(user);

    // Guardar los usuarios nuevamente en LocalStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Limpiar el formulario
    document.getElementById('userForm').reset();

    // Actualizar la lista de usuarios en la interfaz
    loadUsers();
});

// Función para cargar y mostrar los usuarios en la página
function loadUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userList = document.getElementById('userList');

    // Limpiar la lista antes de agregar los usuarios
    userList.innerHTML = '';

    // Recorrer los usuarios y agregarlos a la lista en la página
    users.forEach((user, index) => {
        const li = document.createElement('li');
        li.textContent = `Nombre: ${user.name}, Correo: ${user.email}`;

        // Botón para eliminar el usuario
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = function() {
            deleteUser(index);
        };

        li.appendChild(deleteButton);
        userList.appendChild(li);
    });
}

// Función para eliminar un usuario
function deleteUser(index) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.splice(index, 1); // Eliminar el usuario por su índice
    localStorage.setItem('users', JSON.stringify(users)); // Guardar los cambios
    loadUsers(); // Volver a cargar la lista de usuarios
}
