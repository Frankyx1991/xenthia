
require('dotenv').config();
const cerebroAuto = require('./cerebro_automejora');

// Ejecutar revisión de Cerebro IA cada 6 horas
setInterval(async () => {
  console.log("🧠 Revisando Cerebro IA...");
  await cerebroAuto.ejecutarRevision();
}, 6 * 60 * 60 * 1000); // 6 horas
