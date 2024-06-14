document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#prestacion-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = document.querySelector('.nombre').value;
        const lado = document.querySelector('.lado').value;
        const indicacion = document.querySelector('.indicacion').value;
        const justificacion = document.querySelector('.justificacion').value;

        try {
            const response = await fetch('/prestacion/crear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, lado, indicacion, justificacion })
            });

            if (!response.ok) {
                throw new Error('Error al crear la prestación');
            }

            const mensaje = document.createElement('p');
            mensaje.textContent = 'Prestación añadida correctamente';
            mensaje.classList.add('mensaje-exito');
            form.appendChild(mensaje);
            
            setTimeout(() => {
                mensaje.remove();
            }, 3000);

            form.reset();
        } catch (error) {
            console.error('Error:', error);
        }
    });
});