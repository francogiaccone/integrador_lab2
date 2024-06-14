document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#form');
    const especialidadesSeleccionadas = document.querySelector('.especialidades-seleccionadas');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = document.querySelector('input[name="nombre"]').value;
        const apellido = document.querySelector('input[name="apellido"]').value;
        const documento = document.querySelector('input[name="documento"]').value;
        const fechaNacimiento = document.querySelector('input[name="fechaNacimiento"]').value;
        const domicilio = document.querySelector('input[name="domicilio"]').value;
        const sexo = document.querySelector('select[name="sexo"]').value;
        const profesion = document.querySelector('input[name="profesion"]').value;
        const idREFEPS = document.querySelector('input[name="idREFEPS"]').value;
        let idsEspecialidades = Array.from(especialidadesSeleccionadas.children)
                            .map(especialidad => especialidad.dataset.especialidadId);

                            const id = window.location.pathname.split('/').pop();

        try {
            const response = await fetch(`/profesional/editar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, apellido, documento, fechaNacimiento,
                                        domicilio, sexo, profesion, idREFEPS, idsEspecialidades
                })
            });

            if (!response.ok) {
                throw new Error('Error al crear el profesional');
            }

            const mensaje = document.createElement('p');
            mensaje.textContent = 'Profesional actualizado correctamente';
            mensaje.classList.add('mensaje-exito');
            form.appendChild(mensaje);
            
            setTimeout(() => {
                window.location.href = '/profesional';
            }, 2000);

        } catch (error) {
            console.error('Error:', error);
        }
    });
});