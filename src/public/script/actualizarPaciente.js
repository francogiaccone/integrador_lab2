document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = document.querySelector('.nombre').value;
        const apellido = document.querySelector('.apellido').value;
        const documento = document.querySelector('.documento').value;
        const fechaNacimiento = document.querySelector('.fechaNacimiento').value;
        const domicilio = document.querySelector('.domicilio').value;
        const sexo = document.querySelector('.sexo').value;
        const idPlanObraSocial = document.querySelector('.plan').value;

        const id = window.location.pathname.split('/').pop();

        try {
            const response = await fetch(`/paciente/editar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, apellido, documento, fechaNacimiento,
                                        domicilio, sexo, idPlanObraSocial
                })
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el paciente');
            }

            const mensaje = document.createElement('p');
            mensaje.textContent = 'Paciente actualizado correctamente';
            mensaje.classList.add('mensaje-exito');
            form.appendChild(mensaje);
            
            setTimeout(() => {
                window.location.href = '/paciente';
            }, 2000);

        } catch (error) {
            console.error('Error:', error);
        }
    });
});