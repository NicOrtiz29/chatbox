from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict
from openai import OpenAI
import os
import json
from dotenv import load_dotenv
import logging
import datetime
from fastapi.staticfiles import StaticFiles
import httpx

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Cargar variables de entorno
load_dotenv()

app = FastAPI()

# Montar archivos estáticos
app.mount("/static", StaticFiles(directory="static"), name="static")

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

# Configurar OpenAI
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    logger.error("No se encontró la API key de OpenAI")
    raise ValueError("No se encontró la API key de OpenAI. Por favor, configura OPENAI_API_KEY en el archivo .env")

logger.info("Inicializando cliente OpenAI")
client = OpenAI(
    api_key=api_key,
    base_url="https://api.openai.com/v1"
)

# Modelos de datos
class EmpresaConfig(BaseModel):
    empresaId: str
    primaryColor: str
    secondaryColor: str
    width: str
    height: str
    position: str
    welcomeMessage: str
    buttonText: str
    logo: str

class Empresa(BaseModel):
    nombre: str
    dominio: str
    config: EmpresaConfig

class ChatMessage(BaseModel):
    message: str
    empresa_id: str

# Archivo para almacenar las empresas
EMPRESAS_FILE = os.path.join(os.path.dirname(__file__), "empresas.json")

def cargar_empresas() -> Dict:
    try:
        if os.path.exists(EMPRESAS_FILE):
            with open(EMPRESAS_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        return {}
    except Exception as e:
        print(f"Error al cargar empresas: {str(e)}")
        return {}

def guardar_empresas(empresas: Dict):
    try:
        with open(EMPRESAS_FILE, 'w', encoding='utf-8') as f:
            json.dump(empresas, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print(f"Error al guardar empresas: {str(e)}")
        raise HTTPException(status_code=500, detail="Error al guardar empresas")

# Rutas de la API
@app.get("/api/empresas")
async def get_empresas():
    try:
        empresas = cargar_empresas()
        return empresas
    except Exception as e:
        print(f"Error en get_empresas: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/empresas")
async def crear_empresa(empresa: Empresa):
    try:
        empresas = cargar_empresas()
        if empresa.config.empresaId in empresas:
            raise HTTPException(status_code=400, detail="La empresa ya existe")
        
        empresas[empresa.config.empresaId] = empresa.dict()
        guardar_empresas(empresas)
        return empresa
    except Exception as e:
        print(f"Error en crear_empresa: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/api/empresas/{empresa_id}")
async def actualizar_empresa(empresa_id: str, empresa: Empresa):
    try:
        empresas = cargar_empresas()
        if empresa_id not in empresas:
            raise HTTPException(status_code=404, detail="Empresa no encontrada")
        
        empresas[empresa_id] = empresa.dict()
        guardar_empresas(empresas)
        return empresa
    except Exception as e:
        print(f"Error en actualizar_empresa: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/empresas/{empresa_id}")
async def eliminar_empresa(empresa_id: str):
    try:
        empresas = cargar_empresas()
        if empresa_id not in empresas:
            raise HTTPException(status_code=404, detail="Empresa no encontrada")
        
        del empresas[empresa_id]
        guardar_empresas(empresas)
        return {"message": "Empresa eliminada"}
    except Exception as e:
        print(f"Error en eliminar_empresa: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/chat")
async def chat(message: ChatMessage):
    try:
        print(f"Recibiendo mensaje para empresa {message.empresa_id}: {message.message}")
        
        empresas = cargar_empresas()
        if message.empresa_id not in empresas:
            print(f"Empresa no encontrada: {message.empresa_id}")
            raise HTTPException(status_code=404, detail="Empresa no encontrada")
        
        empresa = empresas[message.empresa_id]
        print(f"Empresa encontrada: {empresa['nombre']}")
        
        # Leer el archivo de contexto específico de la empresa
        context_file = os.path.join(os.path.dirname(__file__), "context", "empresas", f"{message.empresa_id}.txt")
        system_message = ""
        
        try:
            with open(context_file, 'r', encoding='utf-8') as f:
                system_message = f.read()
            print(f"Contexto cargado desde: {context_file}")
        except FileNotFoundError:
            print(f"Archivo de contexto no encontrado: {context_file}")
            system_message = f"""Eres un asistente virtual especializado en proporcionar información sobre {empresa['nombre']}.
            Debes responder las preguntas de manera amable y profesional.
            Si no tienes información específica sobre algo, indícalo amablemente."""
        
        # Usar OpenAI para generar la respuesta
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": message.message}
            ]
        )
        
        respuesta = response.choices[0].message.content
        print(f"Respuesta generada: {respuesta}")
        
        return {
            "response": respuesta,
            "empresa": empresa['nombre']
        }
    except Exception as e:
        print(f"Error en el chat: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    logger.info("Verificación de salud del servidor")
    return {
        "status": "ok",
        "message": "API de Chat funcionando correctamente",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    logger.info("Verificación de salud detallada")
    try:
        # Verificar acceso a OpenAI
        client.models.list()
        openai_status = "ok"
    except Exception as e:
        logger.error(f"Error al verificar OpenAI: {str(e)}")
        openai_status = "error"

    return {
        "status": "ok",
        "openai": openai_status,
        "timestamp": datetime.datetime.now().isoformat()
    }

RUTA_CLIENTES = r"C:/proyectos/wpp-bot/clientes"

@app.post("/webhook")
async def webhook(request: Request):
    data = await request.json()
    print("Datos recibidos en webhook:", data)

    numero = data.get("from")
    mensaje = data.get("body", "")

    # Si no hay mensaje, responde con un error simple
    if not mensaje:
        return {"respuesta": "No se recibió ningún mensaje."}

    # Si hay número y existe un archivo TXT para ese número, responde con el contenido
    if numero:
        archivo_cliente = os.path.join(RUTA_CLIENTES, f"{numero}.txt")
        if os.path.exists(archivo_cliente):
            with open(archivo_cliente, "r", encoding="utf-8") as f:
                respuesta = f.read()
            return {"respuesta": respuesta}

    # Si no hay archivo para el número, responde genérico
    return {"respuesta": f"¡Hola! Recibimos tu mensaje: {mensaje}"}

# Forzar redeploy en Render 

EVOLUTION_API_URL = "https://evolutionchat.onrender.com"  # URL pública en Render
EVOLUTION_API_KEY = os.getenv("EVOLUTION_API_KEY", "")  # Ahora se toma de la variable de entorno
INSTANCE_NAME = "primera-instancia"  # El nombre de tu instancia

async def enviar_mensaje_wpp(numero, mensaje):
    url = f"{EVOLUTION_API_URL}/message/sendText/{INSTANCE_NAME}"
    headers = {"apikey": EVOLUTION_API_KEY}
    payload = {
        "to": numero,
        "message": mensaje
    }
    async with httpx.AsyncClient() as client:
        r = await client.post(url, json=payload, headers=headers)
        print("Respuesta de Evolution API:", r.text) 