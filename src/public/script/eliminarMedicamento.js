document.addEventListener('DOMContentLoaded', () => {
    //eliminar
    const acciones = document.querySelectorAll('.eliminar');
    acciones.forEach(el => {
        el.addEventListener('click', async (e) => {
            e.preventDefault();
            const tr = e.target.closest('tr');
            const id = tr.querySelector('td').textContent.trim();

            try {
                const response = await fetch(`/medicamento/eliminar/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    tr.remove();
                } else {
                    throw new Error('Error al eliminar el medicamento');
                }
            } catch (error) {
                console.error(error);
                console.log('Error al eliminar el medicamento');
            }
        });
    });
});