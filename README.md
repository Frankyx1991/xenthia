
# Xenthia Automejora de Cerebro IA

Este módulo permite a Xenthia escanear, corregir y actualizar automáticamente el repositorio de Cerebro IA usando GitHub.

### Variables necesarias en `.env`

```
GITHUB_TOKEN=tu_token_personal
REPO_CEREBRO=https://github.com/Frankyx1991/cerebro-ia.git
```

### Qué hace:
- Clona el repositorio.
- Revisa si existe `package.json`.
- Añade `start` script si no está.
- Hace commit y push automático a `main`.

Se ejecuta automáticamente cada 6 horas.
