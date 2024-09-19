const express = require('express');
const router = express.Router();
const autoController = require('../controllers/ControlAuto');

// Ruta para mostrar el formulario
router.get('/buscar', (req, res) => {
    res.render('buscarAuto'); // Renderiza la vista buscarAuto.ejs
});

// Ruta para procesar el formulario
router.post('/buscar', autoController.buscarAuto);

module.exports = router;
