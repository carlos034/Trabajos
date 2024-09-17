const mqtt = require('mqtt')
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const clientId = 'emqx_nodejs_' + Math.random().toString(16).substring(2, 8)
const username = 'draco'
const password = 'draco1616'
const topicTurbidez = 'data/sensor'
const topicRelee = '/data/relee'
const qos = 0
const port = 3050
const app = express();

app.use(cors());

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/test');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión:'));
db.once('open', () => {
  console.log('Conexión exitosa a la base de datos.');
});

// Definir un esquema y un modelo de Mongoose para los datos del sensor
const sensorDataSchema = new mongoose.Schema({
    voltage: Number,
    ntu: Number,
    timestamp: { type: Date, default: Date.now },
    state: String
});

const SensorData = mongoose.model('datos', sensorDataSchema);

const client = mqtt.connect('mqtts://nd8da190.ala.us-east-1.emqxsl.com:8883', {
    clientId,
    username,
    password,
})

client.subscribe(topicTurbidez, { qos }, (error) => {
    if (error) {
        console.log('subscribe error: ', error)
        return
    }
    console.log(`Subscribe to topic '${topicTurbidez}'`)
})
client.subscribe(topicRelee, { qos }, (error) => {
    if (error) {
        console.log('subscribe error:', error)
        return
    }
    console.log(`Subscribe to topic '${topicRelee}'`)
})

// Definir un objeto para almacenar los datos del sensor
let sensorData = {
    voltage: 0,
    ntu: 0,
    timestamp: new Date(), // Añadir el timestamp inicial
    state: ''
};

client.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString());

    if (topic === topicTurbidez) {
        // Lógica para manejar mensajes de topicTurbidez
        const message = JSON.parse(payload.toString());
        sensorData = {
            voltage: message.voltage,
            ntu: message.ntu,
            timestamp: new Date(),
            state: message.state
        };

        const sensorDataInstance = new SensorData(sensorData);
        sensorDataInstance.save()
            .then(() => {
                console.log('Datos del sensor guardados correctamente');
            })
            .catch((err) => {
                console.log('Error al guardar los datos del sensor:', err);
            });
    } else if (topic === topicRelee) {
        // Lógica para manejar mensajes de topicRelee
        const relayState = payload.toString(); // El payload contiene directamente el estado del relé
        console.log('Relay state:', relayState);
        // Aquí puedes agregar más lógica según sea necesario
    }
});

client.publish(topicRelee, 'on', { qos }, (error) => {
    if (error) {
      console.error(error)
    }
  });


// Middleware para procesar solicitudes JSON
app.use(bodyParser.json());

// Ruta para obtener datos del sensor
app.get('/sensor-data', (req, res) => {
    res.json(sensorData);
});

// Agregar una nueva ruta POST para manejar la solicitud de activación del evento
app.post('/button', (req, res) => {
    const command = req.body.command; // Obtener el comando del cuerpo de la solicitud

    // Verificar si el comando es válido y publicar el mensaje al tema topicRelee
    if (command === 'on') {
        client.publish(topicRelee, 'on', { qos }, (error) => {
            if (error) {
                console.error(error);
                res.status(500).send('Error al activar la bombilla');
            } else {
                console.log('Bombilla encendida');
                res.status(200).send('Bombilla encendida');
            }
        });
    } else {
        res.status(400).send('Comando no válido');
    }
});


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor web en ejecución en http://localhost:${port}`);
});

if (client.connected) {
    try {
        client.end(false, () => {
            console.log('disconnected successfully')
        })
    } catch (error) {
        console.log('disconnect error:', error)
    }
}
