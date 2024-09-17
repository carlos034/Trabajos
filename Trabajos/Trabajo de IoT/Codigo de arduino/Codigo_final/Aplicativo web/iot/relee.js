document.getElementById("button").addEventListener("click", () => {
    // Realizar una solicitud HTTP al servidor para activar el evento
    fetch('http://localhost:3050/button', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ command: 'on' }) // Enviar el comando 'on' al servidor
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al activar la bombilla');
        }
        console.log('Bombilla encendida');
    })
    .catch(error => {
        console.error('Error:', error);
    });
});