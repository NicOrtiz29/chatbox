// Configuración global del widget
window.ChatWidgetConfig = {
  // URL base del backend
  apiUrl: 'https://chatbox-0r1r.onrender.com/api/chat',
  
  // Configuración por defecto
  defaultConfig: {
    primaryColor: '#1976d2',
    secondaryColor: '#f5f5f5',
    width: '350px',
    height: '500px',
    position: 'bottom-right',
    welcomeMessage: '¡Hola! ¿En qué puedo ayudarte?',
    buttonText: 'Chat'
  }
};

// Función para inicializar el widget
function initChatWidget(config = {}) {
  // Combinar la configuración por defecto con la personalizada
  const finalConfig = {
    ...window.ChatWidgetConfig.defaultConfig,
    ...config
  };

  // Crear el script del widget
  const script = document.createElement('script');
  script.src = 'https://tu-dominio.com/chat-widget.js';
  script.async = true;
  
  // Agregar la configuración al objeto global
  window.ChatWidgetConfig = {
    ...window.ChatWidgetConfig,
    ...finalConfig
  };

  // Agregar el script al documento
  document.body.appendChild(script);
} 