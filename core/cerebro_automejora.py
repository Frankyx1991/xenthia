import os
import requests
from github import Github

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
REPO_NAME = "Frankyx1991/cerebro-ia"
FILE_TO_CHECK = "bot.js"
BRANCH = "main"

def obtener_errores():
    try:
        with open("logs.txt", "r") as f:
            return f.read()
    except FileNotFoundError:
        return ""

def analizar_errores(logs):
    mejoras = []
    if "Cannot find module 'axios'" in logs:
        mejoras.append("Añadir 'axios' a package.json e instalar.")
    if "Bot Token is required" in logs:
        mejoras.append("Verificar si el token de Telegram está cargado en .env.")
    return mejoras

def aplicar_mejoras(mejoras):
    for mejora in mejoras:
        print(f"✅ Mejora aplicada: {mejora}")

def subir_a_github(mejoras, github_token, repo_name):
    g = Github(github_token)
    repo = g.get_repo(repo_name)
    contenido = "\n".join(["Mejoras aplicadas automáticamente:"] + mejoras)
    repo.create_issue(title="Auto-mejoras aplicadas por Xenthia", body=contenido)

if __name__ == "__main__":
    logs = obtener_errores()
    mejoras = analizar_errores(logs)
    if mejoras:
        aplicar_mejoras(mejoras)
        subir_a_github(mejoras, GITHUB_TOKEN, REPO_NAME)
