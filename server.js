const express = require('express');
require('dotenv').config();

const { corregirXenthia } = require('./xenthia_automejora');
const { updateRepository } = require('./updater');

const app = express();
app.use(express.json());

/**
 * Endpoint de salud. Devuelve un mensaje simple para indicar que el
 * servicio está activo.
 */
app.get('/salud', (req, res) => {
  res.json({ mensaje: 'Xenthia operativa' });
});

/**
 * Recibe un catálogo y una pregunta y devuelve una respuesta genérica
 * simulando un análisis de mercado. En un caso real esta función
 * aplicaría algoritmos avanzados o modelos de IA. Aquí simplemente
 * responde con un resumen basado en el número de productos.
 */
app.post('/estudio_mercado', async (req, res, next) => {
  try {
    const { catalogo = [], pregunta = '' } = req.body || {};
    // Genera una respuesta simple utilizando los datos proporcionados.
    const numProductos = Array.isArray(catalogo) ? catalogo.length : 0;
    const respuesta = `Se han analizado ${numProductos} productos. ${pregunta ? `Pregunta recibida: "${pregunta}".` : ''} Considera diversificar tu oferta y optimizar precios.`;
    res.json({ respuesta });
  } catch (err) {
    next(err);
  }
});

/**
 * Endpoint que acepta actualizaciones desde Cerebro‑IA. La información
 * recibida se imprime en consola y se devuelve una confirmación.
 */
app.post('/corregir_cerebro', (req, res, next) => {
  try {
    const data = req.body;
    console.log('[Actualización de Cerebro‑IA recibida]', data);
    res.json({ respuesta: 'Actualización recibida y procesada por Xenthia.' });
  } catch (err) {
    next(err);
  }
});

/**
 * Middleware de manejo de errores. Devuelve 500 y un mensaje genérico
 * cuando ocurre una excepción en un controlador【806611295779457†L73-L150】.
 */
app.use((err, req, res, next) => {
  console.error('[Error Xenthia]', err);
  res.status(500).json({ error: 'Ha ocurrido un error en Xenthia.' });
});

/**
 * Inicia el servicio. Ejecuta las tareas de auto‑corrección y
 * auto‑actualización antes de levantar el servidor. Si algo falla,
 * continúa para asegurar que el API responda, aunque sin las últimas
 * mejoras.
 */
function start() {
  // Ejecuta auto‑corrección y actualización en segundo plano.
  corregirXenthia();
  updateRepository();
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Xenthia escuchando en el puerto ${port}`);
  });
}

start();