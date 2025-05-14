document.getElementById('validarCampos').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtiene los valores ingresados por el usuario
    const usuarioLogin = document.getElementById('usuarioLogin').value;
    const correoLogin = document.getElementById('correoLogin').value;
    const contraseñaLogin = document.getElementById("contraseñaLogin").value;

    // Recupera la lista de usuarios registrados
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verifica si los datos coinciden con algún usuario registrado
    const usuarioEncontrado = usuarios.find(user =>
        user.usuario === usuarioLogin &&
        user.correo === correoLogin &&
        user.contraseña === contraseñaLogin
    );

    if (usuarioEncontrado) {
        alert('Inicio de sesión exitoso');
        
        // Guarda solo los datos necesarios del usuario para la sesión actual
        localStorage.setItem('usuarioActual', JSON.stringify(usuarioEncontrado));
        
        // Redirige al usuario a la página de inicio
        window.location.href = '/Assets/html/inicio.html';
    } else {
        // Muestra mensaje de error en caso de datos incorrectos
        const mensajeError = document.getElementById('mensajeError');
        mensajeError.textContent = 'El usuario, correo o contraseña son incorrectos';
        mensajeError.style.display = 'block';

        // Oculta el mensaje después de 3 segundos
        setTimeout(() => {
            mensajeError.style.display = 'none';
        }, 3000);
    }
});
