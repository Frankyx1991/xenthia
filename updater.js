const { execSync } = require('child_process');

/**
 * Actualiza el repositorio de Xenthia usando comandos de Git y
 * reinstala las dependencias. Si ocurre algún error se registra pero
 * no se interrumpe el proceso, permitiendo que la aplicación arranque
 * aunque no haya podido actualizarse.
 */
function updateRepository() {
  try {
    console.log('[Auto‑actualización Xenthia] Buscando actualizaciones...');
    execSync('git fetch', { stdio: 'inherit' });
    execSync('git reset --hard origin/main', { stdio: 'inherit' });
    console.log('[Auto‑actualización Xenthia] Instalando dependencias...');
    execSync('npm install', { stdio: 'inherit' });
    console.log('[Auto‑actualización Xenthia] Actualización completada.');
  } catch (err) {
    console.error('[Auto‑actualización Xenthia] Error al actualizar:', err.message);
  }
}

module.exports = {
  updateRepository
};