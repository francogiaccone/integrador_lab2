document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    const form = document.querySelector('#form');
    const prestacionesSeleccionadas = document.querySelector('.prestaciones-seleccionadas');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const idPaciente = document.querySelector('select[name="paciente"]').value;
        const diagnostico = document.querySelector('textarea[name="diagnostico"]').value;
        const diasVigencia = document.querySelector('select[name="vigencia"]').value;
        const diasVigenciaInt = parseInt(diasVigencia);

        const fechaPrescripcion_ = new Date();
        const fechaVigencia_ = new Date();
        fechaVigencia_.setDate(fechaPrescripcion_.getDate() + diasVigenciaInt);

        function formatDateToMySQL(date) {
            const year = date.getFullYear();
            const month = ('0' + (date.getMonth() + 1)).slice(-2);
            const day = ('0' + date.getDate()).slice(-2);
            return `${year}-${month}-${day}`;
        }

        const fechaPrescripcion = formatDateToMySQL(fechaPrescripcion_);
        const vigencia = formatDateToMySQL(fechaVigencia_);

        const medicamentos = Array.from(document.querySelectorAll('.medicamento')).map(med => ({
            id: med.querySelector('select[name="medicamento"]').value,
            frecuencia: med.querySelector('input[name="frecuencia"]').value,
            duracion: med.querySelector('input[name="duracion"]').value
        }));

        medicamentos.shift();

        const idsPrestaciones = Array.from(prestacionesSeleccionadas.children)
            .map(prestacion => prestacion.dataset.prestacionesId);

        console.log(idPaciente, diagnostico, fechaPrescripcion, vigencia,
            medicamentos, idsPrestaciones);

        try {
            const response = await fetch('/prescripcion/crear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idProfesional: 6, idPaciente, diagnostico, fechaPrescripcion, vigencia,
                    medicamentos, idsPrestaciones
                })
            });

            if (!response.ok) {
                throw new Error('Error al crear la prescripción');
            }

            const mensaje = document.createElement('p');
            mensaje.textContent = 'Prescripción creada correctamente';
            mensaje.classList.add('mensaje-exito');
            form.appendChild(mensaje);

            setTimeout(() => {
                window.location.href = '/prescripcion';
            }, 2000);
        } catch (error) {
            console.error('Error:', error);
        }
    });
});