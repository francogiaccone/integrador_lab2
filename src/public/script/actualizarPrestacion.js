document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#prestacion-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = document.querySelector('.nombre').value;
        const lado = document.querySelector('.lado').value;
        const indicacion = document.querySelector('.indicacion').value;
        const justificacion = document.querySelector('.justificacion').value;

        const id = window.location.pathname.split('/').pop();

        try {
            const response = await fetch(`/prestacion/editar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, lado, indicacion, justificacion })
            });

            if (!response.ok) {
                throw new Error('Error al actualizar la prestación');
            }

            const mensaje = document.createElement('p');
            mensaje.textContent = 'Prestación actualizada correctamente';
            mensaje.classList.add('mensaje-exito');
            form.appendChild(mensaje);
            
            setTimeout(() => {
                window.location.href = '/prestacion';
            }, 2000);

        } catch (error) {
            console.error('Error:', error);
        }
    });
});