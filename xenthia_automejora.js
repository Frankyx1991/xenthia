const fs = require('fs');
const { execSync } = require('child_process');

/**
 * Revisa el archivo de logs en busca de errores de módulo no encontrado y
 * ejecuta `npm install` para resolverlos. Se comporta de forma muy
 * similar al script de Cerebro‑IA y encapsula las llamadas en
 * bloques `try/catch`【694825549231730†L1032-L1059】.
 */
function corregirXenthia() {
  const logPath = 'logs.txt';
  if (!fs.existsSync(logPath)) {
    return;
  }
  const contenido = fs.readFileSync(logPath, 'utf8');
  const regex = /Cannot find module '(.*?)'/g;
  let match;
  const mods = new Set();
  while ((match = regex.exec(contenido)) !== null) {
    mods.add(match[1]);
  }
  mods.forEach((mod) => {
    try {
      console.log(`[Auto‑mejora Xenthia] Instalando dependencia faltante: ${mod}`);
      execSync(`npm install ${mod}`, { stdio: 'inherit' });
    } catch (err) {
      console.error(`[Auto‑mejora Xenthia] Error al instalar ${mod}:`, err.message);
    }
  });
}

module.exports = {
  corregirXenthia
};