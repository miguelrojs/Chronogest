// Esperamos a que el DOM esté completamente cargado
    document.addEventListener('DOMContentLoaded', function() {
        console.log("DOM completamente cargado");
        
        // Obtener referencias a elementos DOM claves
        const olvidoPassword = document.getElementById('olvidoPassword');
        const menuCambioContraseña = document.getElementById('menuCambioContraseña');
        const overlay = document.getElementById('overlay');
        const formCambioContraseña = document.getElementById('formCambioContraseña');
        
        // Verificar que los elementos existan y mostrar en la consola
        console.log("Botón olvidó contraseña:", olvidoPassword);
        console.log("Menú cambio contraseña:", menuCambioContraseña);
        console.log("Overlay:", overlay);
        console.log("Formulario cambio contraseña:", formCambioContraseña);
        
        // IMPORTANTE: Verificar si los elementos existen antes de asignar eventos
        if (olvidoPassword) {
            // Mostrar el menú flotante al hacer clic en "¿Olvidó su contraseña?"
            olvidoPassword.addEventListener('click', function(e) {
                e.preventDefault(); // Prevenir comportamiento por defecto
                console.log("Clic en botón olvidó contraseña");
                menuCambioContraseña.style.display = 'block';
                overlay.style.display = 'block';
            });
        } else {
            console.error("No se encontró el botón de olvidó contraseña");
        }
        
        if (overlay) {
            // Cerrar el menú al hacer clic fuera de él
            overlay.addEventListener('click', function() {
                console.log("Clic en overlay");
                menuCambioContraseña.style.display = 'none';
                overlay.style.display = 'none';
                if (document.getElementById('mensajeValidacionCorreo')) {
                    document.getElementById('mensajeValidacionCorreo').textContent = "";
                }
                if (document.getElementById('correoCambio')) {
                    document.getElementById('correoCambio').value = "";
                }
            });
        }
        
        if (formCambioContraseña) {
            // Manejar el envío del formulario para restablecer contraseña
            formCambioContraseña.addEventListener('submit', function(e) {
                e.preventDefault(); // Prevenir envío del formulario
                console.log("Formulario enviado");
                
                const correo = document.getElementById('correoCambio').value.trim();
                const mensaje = document.getElementById('mensajeValidacionCorreo');
                
                // Validar que se ingresó un correo
                if (!correo) {
                    mensaje.textContent = "Por favor ingrese un correo válido.";
                    mensaje.style.color = "red";
                    return;
                }
                
                // Validar formato de correo electrónico
                if (!validarEmail(correo)) {
                    mensaje.textContent = "El formato del correo no es válido.";
                    mensaje.style.color = "red";
                    return;
                }
                
                // Obtener usuarios del localStorage
                let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
                
                // Buscar si el correo existe
                const usuarioEncontrado = usuarios.find(usuario => usuario.correo === correo);
                
                if (!usuarioEncontrado) {
                    mensaje.textContent = "No existe una cuenta con este correo.";
                    mensaje.style.color = "red";
                    return;
                }
                
                // Generar nueva contraseña aleatoria
                const nuevaContraseña = generarContraseñaAleatoria();
                
                // Actualizar la contraseña del usuario
                usuarioEncontrado.contraseña = nuevaContraseña;
                
                // Guardar cambios en localStorage
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
                
                // Simular envío de correo (en producción debería conectarse a un servicio real)
                mensaje.innerHTML = `Se ha restablecido su contraseña.<br>Su nueva contraseña temporal es: <strong>${nuevaContraseña}</strong><br>Por favor cámbiela después de iniciar sesión.`;
                mensaje.style.color = "green";
                
                // Guardar en localStorage la información de restablecimiento
                const resetInfo = {
                    correo: correo,
                    timestamp: new Date().toISOString(),
                    nuevaContraseña: nuevaContraseña
                };
                localStorage.setItem('restablecimientoContraseña_' + correo, JSON.stringify(resetInfo));
                
                // Cerrar el menú después de unos segundos
                setTimeout(function() {
                    menuCambioContraseña.style.display = 'none';
                    overlay.style.display = 'none';
                    document.getElementById('correoCambio').value = "";
                    mensaje.textContent = "";
                }, 10000); // 10 segundos para que el usuario pueda ver la nueva contraseña
            });
        }
    });

    // Función para validar formato de correo electrónico
    function validarEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Función para generar contraseña aleatoria
    function generarContraseñaAleatoria() {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let contraseña = '';
        for (let i = 0; i < 10; i++) {
            contraseña += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return contraseña;
    }