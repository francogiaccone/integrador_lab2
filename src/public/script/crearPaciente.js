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

        try {
            const response = await fetch('/paciente/crear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, apellido, documento, fechaNacimiento,
                                        domicilio, sexo, idPlanObraSocial
                })
            });

            if (!response.ok) {
                throw new Error('Error al crear el paciente');
            }

            const mensaje = document.createElement('p');
            mensaje.textContent = 'Paciente añadido correctamente';
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