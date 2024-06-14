document.addEventListener('DOMContentLoaded', function() {
    const agregarMedicamentoBtn = document.getElementById('agregarMedicamentoBtn');
    const medicamentosContainer = document.getElementById('medicamentos-container');
    const form = document.getElementById('form');
    let contadorMedicamentos = 0;

    agregarMedicamentoBtn.addEventListener('click', function() {
        contadorMedicamentos++;

        const plantillaMedicamento = document.querySelector('.medicamento');
        const nuevoMedicamento = plantillaMedicamento.cloneNode(true);
        nuevoMedicamento.style.display = 'block';

        const medicamentoInput = nuevoMedicamento.querySelector('select[name="medicamento"]');
        const frecuenciaInput = nuevoMedicamento.querySelector('input[name="frecuencia"]');
        const duracionInput = nuevoMedicamento.querySelector('input[name="duracion"]');

        medicamentoInput.name = `medicamento`;
        frecuenciaInput.name = `frecuencia`;
        duracionInput.name = `duracion`;

        medicamentoInput.setAttribute('required', '');
        frecuenciaInput.setAttribute('required', '');
        duracionInput.setAttribute('required', '');

        medicamentosContainer.appendChild(nuevoMedicamento);
        
        if (medicamentosContainer.style.display === 'none') {
            medicamentosContainer.style.display = 'block';
        }
    });

    form.addEventListener('click', function(event) {
        if (event.target.classList.contains('eliminarMedicamento')) {
            const medicamentoAEliminar = event.target.parentElement;
            medicamentoAEliminar.remove();
        }
    });
});