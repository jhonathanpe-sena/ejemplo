
document.addEventListener('DOMContentLoaded', () => {
    // Referencia al contenedor de las cards
    const dashboardGrid = document.getElementById('dashboardGrid');
    const nombreUsuario = localStorage.getItem("nombreUsuario");

    //Componente para cargar usuario
    function CargarUsuario(nombreUsuario) {
        return `<h2>Bienvenido al Dashboard, ${nombreUsuario}.</h2>`;
    }

    // cargar usuario en el header
    const welcomeHeader = document.getElementById("welcome-header");
    if (welcomeHeader && nombreUsuario) {
        welcomeHeader.innerHTML = CargarUsuario(nombreUsuario);
    }

    // Datos simulados para las cards
    // En una aplicación real, estos datos vendrían de una API o base de datos.
    const dashboardData = [
        {
            id: 1,
            title: 'No. Evidencias Pendientes',
            value: 12,
            colorClass: 'warning' // Naranja/Amarillo
        },
        {
            id: 2,
            title: 'Evidencias Asignadas',
            value: 45,
            colorClass: 'info' // Azul
        },
        {
            id: 3,
            title: 'No. Evidencias Calificadas',
            value: 30,
            colorClass: 'success' // Verde
        },
        {
            id: 4,
            title: 'Próximas a vencer',
            value: 5,
            colorClass: 'danger' // Rojo
        },
        {
            id: 5,
            title: 'No. Evidencias Cerradas',
            value: 150,
            colorClass: 'purple' // Morado
        },
        {
            id: 6,
            title: 'No. Fichas Asignadas',
            value: 8,
            colorClass: 'teal' // Verde azulado
        },
        {
            id: 7,
            title: 'Fichas',
            value: [
                '2541890', '2637481', '2748192', '2837465',
                '2948571', '3049582', '3150693', '3261704'
            ],
            colorClass: 'pink', // Rosa
            extraClass: 'fichas-card'
        }
    ];

    // Función para renderizar las cards
    const renderCards = (data) => {
        const dashboardGrid = document.getElementById('dashboardGrid');
        const fichasContainer = document.getElementById('fichasContainer');

        // Limpiamos los contenedores
        if (dashboardGrid) dashboardGrid.innerHTML = '';
        if (fichasContainer) fichasContainer.innerHTML = '';

        data.forEach(item => {
            // Crear el elemento de la card
            const card = document.createElement('div');
            card.className = `stat-card ${item.colorClass} ${item.extraClass || ''}`;

            let valueHtml = '';
            if (Array.isArray(item.value)) {
                // Si el valor es un arreglo (como las fichas), creamos una lista
                valueHtml = '<ul class="fichas-list">';
                item.value.forEach(num => {
                    valueHtml += `<li><span class="dot"></span>${num}</li>`;
                });
                valueHtml += '</ul>';
            } else {
                // Si es un valor numérico simple
                valueHtml = `<div class="stat-value">${item.value}</div>`;
            }

            // Contenido HTML interno de la card
            card.innerHTML = `
                <h3>${item.title}</h3>
                ${valueHtml}
            `;

            // Decidir en qué contenedor agregar la card
            if (item.id === 7) {
                if (fichasContainer) fichasContainer.appendChild(card);
            } else {
                if (dashboardGrid) dashboardGrid.appendChild(card);
            }
        });
    };

    // Llamamos a la función para inyectar los datos en el HTML
    renderCards(dashboardData);
});
