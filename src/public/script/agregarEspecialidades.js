document.addEventListener('DOMContentLoaded', () => {
    const especialidadesDisponibles = document.querySelectorAll('.especialidad-disponible');
    const especialidadesSeleccionadas = document.querySelector('.especialidades-seleccionadas');

    especialidadesDisponibles.forEach(especialidad => {
        especialidad.addEventListener('click', () => {
            const especialidadClon = especialidad.cloneNode(true);
            
            const btnEliminar = document.createElement('button');
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.addEventListener('click', () => {
                especialidadesSeleccionadas.removeChild(especialidadClon);
                especialidad.style.display = 'block';
            });
            especialidadClon.appendChild(btnEliminar);

            especialidad.style.display = 'none';

            especialidadesSeleccionadas.appendChild(especialidadClon);
        });
    });
});
