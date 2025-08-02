# Xenthia

**Xenthia** es un servicio de backend pensado para integrarse con
Cerebro‑IA. Recibe solicitudes de análisis de mercado, devuelve
sugerencias o respuestas automatizadas y acepta notificaciones de
actualización. Se distribuye como una aplicación Node.js basada en
Express y está diseñada para configurarse y mantenerse por sí misma.

## Instalación

1. Clona este repositorio o descarga los archivos en tu equipo.
2. Ejecuta `npm install` para instalar las dependencias.
3. Copia `.env.example` a `.env` y ajusta las variables según tus
   necesidades. El paquete [`dotenv`](https://www.npmjs.com/package/dotenv)
   carga estas variables en `process.env`【399544381389106†L20-L83】.
4. Inicia el servicio con `npm start`. Durante el arranque se
   ejecutarán tareas de auto‑corrección y actualización. El servidor
   escuchará en el puerto configurado en `PORT`.

## Endpoints

| Método | Ruta                   | Descripción                                                             |
|-------|------------------------|-------------------------------------------------------------------------|
| POST  | `/estudio_mercado`     | Recibe un catálogo y una pregunta. Devuelve un análisis genérico.        |
| POST  | `/corregir_cerebro`    | Recibe actualizaciones desde Cerebro‑IA. Registra la actualización.     |
| GET   | `/salud`               | Devuelve un mensaje de salud para comprobar que el servicio está vivo.   |

Todos los endpoints aceptan y devuelven JSON. En caso de errores
asíncronos se utiliza el middleware de Express para capturarlos de
forma adecuada【806611295779457†L73-L150】.

## Características

- **Servicio HTTP**: construido con Express. Los controladores están
  diseñados para ser asíncronos y devolver respuestas consistentes.
- **Auto‑corrección**: el script `xenthia_automejora.js` revisa el
  archivo `logs.txt` en busca de errores relacionados con módulos
  faltantes y ejecuta `npm install` para instalarlos, siguiendo las
  recomendaciones sobre `child_process.execSync()`【694825549231730†L1032-L1059】.
- **Auto‑actualización**: el script `updater.js` utiliza comandos de
  Git para obtener la última versión del repositorio remoto. Ejecuta
  `git fetch`, `git reset --hard origin/main` y `npm install` para
  mantener la aplicación al día sin depender de paquetes externos.
- **Variables de entorno**: todas las claves configurables (puerto,
  URL del repositorio, claves API) se almacenan en un archivo `.env`
  que no se debe subir al repositorio. `dotenv` carga estas
  variables al inicio【399544381389106†L20-L83】.

## Seguridad

- **Entradas no fiables**: valida siempre los datos de entrada en tu
  aplicación cliente antes de enviarlos a Xenthia. Este servidor
  implementa una validación mínima para mantener el ejemplo simple.
- **Comandos del sistema**: los scripts de auto‑corrección y
  actualización usan `execSync()`. Dado que esta función bloquea el
  hilo y lanza excepciones al fallar, se encapsulan en bloques
  `try/catch`【694825549231730†L1032-L1059】.
- **Actualizaciones automáticas**: asegúrate de que el repositorio
  remoto configurado sea accesible y que no tengas cambios locales sin
  comprometer, ya que `git reset --hard` sobrescribe el estado local.

## Licencia

El proyecto se distribuye bajo la licencia MIT.