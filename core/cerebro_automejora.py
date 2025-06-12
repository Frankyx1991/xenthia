
import os
import json

def analizar_proyecto_cerebro():
    errores = []

    if not os.path.exists('server.js'):
        errores.append('❌ Falta el archivo server.js')
    if not os.path.exists('index.html'):
        errores.append('❌ Falta el archivo index.html')
    if not os.path.exists('package.json'):
        errores.append('❌ Falta el archivo package.json')
    else:
        with open('package.json') as f:
            try:
                json.load(f)
            except json.JSONDecodeError:
                errores.append('❌ El archivo package.json tiene errores de sintaxis JSON')

    if not errores:
        return '✅ Todo correcto en Cerebro IA'
    return '\n'.join(errores)

if __name__ == '__main__':
    resultado = analizar_proyecto_cerebro()
    print(resultado)
