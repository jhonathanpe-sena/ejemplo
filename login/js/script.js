// Esperar a que el HTML esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del DOM
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const globalMessage = document.getElementById('globalMessage');

    // Datos simulados para autenticación
    const USUARIO = 'admin@mail.com';
    const PASSWORD = '123456';
    const nombreUsuario = 'Andres';

    // Expresión regular para validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Función auxiliar para mostrar errores debajo del campo
    const showError = (inputElement, errorElement, message) => {
        inputElement.classList.add('input-error');
        errorElement.textContent = message;
        errorElement.classList.add('visible');
    }

    // Función auxiliar para limpiar errores
    const clearError = (inputElement, errorElement) => {
        inputElement.classList.remove('input-error');
        errorElement.textContent = '';
        errorElement.classList.remove('visible');
    }
    // Función para limpiar alertas globales
    const clearGlobalMessage = () => {
        globalMessage.textContent = '';
        globalMessage.className = 'global-message'; // Restablece clases
    };

    // Escuchar el evento 'input' para ir limpiando errores al momento que el usuario ingresa al input
    emailInput.addEventListener('input', () => {
        clearError(emailInput, emailError);
        clearGlobalMessage();
    });

    passwordInput.addEventListener('input', () => {
        clearError(passwordInput, passwordError);
        clearGlobalMessage();
    });

    // Escuchar el evento 'submit' (envío del formulario)
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que la página se recargue por defecto

        // Limpiamos mensajes globales antes de volver a intentar
        clearGlobalMessage();

        // Obtenemos los valores de los inputs y eliminamos espacios en blanco
        const emailValue = emailInput.value.trim();
        const passwordValue = passwordInput.value.trim();

        // Bandera para validar el formulario
        let isFormValid = true;

        // 1. Validar Correo
        if (emailValue === '') {
            showError(emailInput, emailError, 'El correo es obligatorio.');
            isFormValid = false;
        } else if (!emailRegex.test(emailValue)) {
            showError(emailInput, emailError, 'Ingresa un formato de correo válido.');
            isFormValid = false;
        } else {
            clearError(emailInput, emailError);
        }

        // 2. Validar Contraseña
        if (passwordValue === '') {
            showError(passwordInput, passwordError, 'La contraseña es obligatoria.');
            isFormValid = false;
        } else {
            clearError(passwordInput, passwordError);
        }

        // Si hay errores en el formulario, detenemos la ejecución aquí
        if (!isFormValid) {
            return;
        }

        // 3. Simulación de Autenticación si los campos son válidos
        if (emailValue === USUARIO && passwordValue === PASSWORD) {
            // Login exitoso
            globalMessage.textContent = '¡Inicio de sesión exitoso! Redirigiendo...';
            globalMessage.classList.add('success');

            // Guardamos el email en localStorage para usarlo en el dashboard
            localStorage.setItem("nombreUsuario", nombreUsuario);

            // Redirección al dashboard
            setTimeout(() => { window.location.href = './pages/dashboard.html'; }, 500);
        } else {
            // Login incorrecto
            globalMessage.textContent = 'Correo o contraseña incorrectos.';
            globalMessage.classList.add('error');
        }
    });
});