# Webhook Backend para Xenthia o Cerebro IA

Este proyecto expone un endpoint `/webhook` que se puede conectar con GitHub para realizar auto-mejoras cuando se detecta un `push` en la rama `main`.

## Configuración

1. Cambia el valor de `GITHUB_SECRET` en el `.env`.
2. Agrega esta URL en tu GitHub Webhook:
   ```
   https://<tu-backend>.run.app/webhook
   ```
3. Selecciona `application/json` y añade tu clave secreta en GitHub.

