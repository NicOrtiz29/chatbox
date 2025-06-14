# Chat Asistente con IA

Este proyecto implementa un sistema de chat que utiliza ChatGPT para responder preguntas basadas en información personalizada. Incluye un widget flotante que puede ser fácilmente integrado en cualquier sitio web.

## Características

- Interfaz de chat moderna y responsiva
- Integración con ChatGPT
- Capacidad para cargar contexto desde archivos txt
- Widget flotante para integración fácil en sitios web
- Diseño escalable para futuras funcionalidades

## Requisitos

- Python 3.8+
- Node.js 14+
- Cuenta de OpenAI con API key

## Instalación

### Backend

1. Crear un entorno virtual:
```bash
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
```

2. Instalar dependencias:
```bash
pip install -r requirements.txt
```

3. Crear archivo .env en la carpeta backend:
```
OPENAI_API_KEY=tu_api_key_aqui
```

### Frontend

1. Instalar dependencias:
```bash
cd frontend
npm install
```

## Ejecución

1. Iniciar el backend:
```bash
cd backend
uvicorn main:app --reload
```

2. Iniciar el frontend:
```bash
cd frontend
npm start
```

El frontend estará disponible en http://localhost:3000 y el backend en http://localhost:8000

## Integración del Widget en Sitios Web

Para integrar el widget del chat en cualquier sitio web, simplemente agrega el siguiente código antes del cierre del tag `</body>`:

```html
<script>
  window.ChatWidgetConfig = {
    apiUrl: 'https://tu-dominio.com/api/chat',
    theme: {
      primaryColor: '#1976d2',  // Color principal del widget
      secondaryColor: '#f5f5f5' // Color secundario del widget
    }
  };
</script>
<script src="https://tu-dominio.com/chat-widget.js" async></script>
```

### Personalización

El widget puede ser personalizado mediante la configuración:

```javascript
window.ChatWidgetConfig = {
  apiUrl: 'https://tu-dominio.com/api/chat',
  theme: {
    primaryColor: '#1976d2',    // Color principal
    secondaryColor: '#f5f5f5',  // Color secundario
    position: 'bottom-right',   // Posición del widget (bottom-right, bottom-left, top-right, top-left)
    width: '350px',            // Ancho del widget
    height: '500px'            // Alto del widget
  },
  welcomeMessage: '¡Hola! ¿En qué puedo ayudarte?', // Mensaje de bienvenida
  buttonText: 'Chat'           // Texto del botón flotante
};
```

## Estructura del Proyecto

```
.
├── backend/
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   └── widget.js
│   ├── public/
│   │   └── chat-widget.js
│   └── package.json
└── README.md
```

## Próximas Mejoras

- Sistema de autenticación de usuarios
- Gestión de turnos
- Historial de conversaciones
- Personalización del contexto por usuario
- Panel de administración
- Temas personalizables para el widget
- Soporte para múltiples idiomas
- Integración con sistemas de tickets 