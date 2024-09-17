const express = require('express');
const Auto = require('./modelo/Auto');
const Persona = require('./modelo/Persona');

const app = express();
app.use(express.json()); // Para poder recibir JSON en las peticiones

// Rutas para autos
app.post('/autos', async (req, res) => {
    const { patente, marca, modelo, dniDuenio } = req.body;
    const auto = new Auto(patente, marca, modelo, dniDuenio);
    await auto.insertar();
    res.send('Auto insertado correctamente');
});

app.put('/autos/:patente', async (req, res) => {
    const { patente } = req.params;
    const { marca, modelo, dniDuenio } = req.body;
    const auto = new Auto(patente, marca, modelo, dniDuenio);
    await auto.modificar();
    res.send('Auto actualizado correctamente');
});

app.delete('/autos/:patente', async (req, res) => {
    const { patente } = req.params;
    const auto = new Auto(patente);
    await auto.eliminar();
    res.send('Auto eliminado correctamente');
});

// Rutas para personas (similares)
app.post('/personas', async (req, res) => {
    const { nroDni, apellido, nombre, fechaNac, telefono, domicilio } = req.body;
    const persona = new Persona(nroDni, apellido, nombre, fechaNac, telefono, domicilio);
    await persona.insertar();
    res.send('Persona insertada correctamente');
});

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});
