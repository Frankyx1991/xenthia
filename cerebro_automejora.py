"""
🧠 cerebro_automejora.py
Este módulo permite a Xenthia escanear, detectar errores comunes y corregir automáticamente el código de Cerebro IA.
"""

import os
import re
import json
from pathlib import Path

REPO_PATH = Path(".")  # raíz del proyecto clonado

def detectar_errores_en_server():
    server_path = REPO_PATH / "server.js"
    if not server_path.exists():
        return ["❌ No se encontró server.js"]

    errores = []
    contenido = server_path.read_text()

    if "express" not in contenido:
        errores.append("⚠️ Falta importar express en server.js")

    if "app.listen" not in contenido:
        errores.append("⚠️ Falta la instrucción app.listen")

    if "bot.webhookCallback" not in contenido:
        errores.append("⚠️ Falta el webhook de Telegram (/bot)")

    return errores

def detectar_errores_html():
    index_path = REPO_PATH / "tienda/index.html"
    if not index_path.exists():
        return ["❌ No se encontró tienda/index.html"]

    contenido = index_path.read_text()
    if "<form" not in contenido or "paypal" not in contenido:
        return ["⚠️ El botón de PayPal no está presente en index.html"]

    return []

def analizar_dependencias():
    pkg_path = REPO_PATH / "package.json"
    if not pkg_path.exists():
        return ["❌ No se encontró package.json"]

    pkg = json.loads(pkg_path.read_text())
    errores = []
    if "start" not in pkg.get("scripts", {}):
        errores.append("⚠️ Falta el script de inicio: "start": "node server.js"")

    deps = pkg.get("dependencies", {})
    requeridos = ["express", "telegraf", "dotenv"]
    for dep in requeridos:
        if dep not in deps:
            errores.append(f"⚠️ Falta dependencia: {dep}")

    return errores

def generar_informe():
    errores = []
    errores += detectar_errores_en_server()
    errores += detectar_errores_html()
    errores += analizar_dependencias()

    if not errores:
        return "✅ Todo correcto en el proyecto Cerebro IA."
    else:
        return "\n".join(errores)

if __name__ == "__main__":
    print("🔍 Iniciando análisis de Cerebro IA...")
    informe = generar_informe()
    print("\n" + informe)
