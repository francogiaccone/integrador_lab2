document.addEventListener('DOMContentLoaded', function () {
    const tabla = document.querySelector('.tabla');
    const buscador = document.querySelector('.buscador');
    const tbody = tabla.querySelector('tbody');
    const filas = Array.from(tbody.querySelectorAll('tr'));

    buscador.addEventListener('input', function () {
        const query = this.value.toLowerCase();
        filas.forEach(fila => {
            const nombreCelda = fila.querySelector('td:nth-child(2)').innerText.toLowerCase();
            if (nombreCelda.includes(query)) {
                fila.style.display = '';
            } else {
                fila.style.display = 'none';
            }
        });
    });
});