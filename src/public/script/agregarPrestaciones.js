document.addEventListener('DOMContentLoaded', () => {
    const prestacionesDisponibles = document.querySelectorAll('.prestacion-disponible');
    const prestacionesSeleccionadas = document.querySelector('.prestaciones-seleccionadas');

    prestacionesDisponibles.forEach(prestacion => {
        prestacion.addEventListener('click', () => {
            const prestacionClon = prestacion.cloneNode(true);
            
            const btnEliminar = document.createElement('button');
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.addEventListener('click', () => {
                prestacionesSeleccionadas.removeChild(prestacionClon);
                prestacion.style.display = 'block';
            });
            prestacionClon.appendChild(btnEliminar);

            prestacion.style.display = 'none';

            prestacionesSeleccionadas.appendChild(prestacionClon);
        });
    });
});
