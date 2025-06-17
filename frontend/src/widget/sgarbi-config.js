// Configuración específica para Sgarbi
window.ChatWidgetConfig = {
  // URL base del backend
  apiUrl: 'https://chatbox-backend.onrender.com',
  
  // Configuración específica para Sgarbi
  defaultConfig: {
    empresaId: 'sgarbi',
    primaryColor: '#1976d2',  // Azul corporativo
    secondaryColor: '#f5f5f5',
    width: '350px',
    height: '500px',
    position: 'bottom-right',
    title: 'Laboratorio Sgarbi Risso',
    welcomeMessage: '¡Bienvenido a Laboratorio Sgarbi Risso! ¿En qué podemos ayudarte?',
    placeholder: 'Escribe tu mensaje aquí...'
  }
};

// Función para cargar scripts
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Función para cargar estilos
function loadStyles() {
  const links = [
    'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap',
    'https://fonts.googleapis.com/icon?family=Material+Icons'
  ];
  
  links.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  });
}

// Función para inicializar el widget
async function initChatWidget(config = {}) {
  try {
    // Cargar estilos
    loadStyles();

    // Cargar dependencias
    await Promise.all([
      loadScript('https://unpkg.com/react@17/umd/react.production.min.js'),
      loadScript('https://unpkg.com/react-dom@17/umd/react-dom.production.min.js'),
      loadScript('https://unpkg.com/@mui/material@5.0.0/umd/material-ui.production.min.js'),
      loadScript('https://unpkg.com/axios/dist/axios.min.js')
    ]);

    // Combinar la configuración por defecto con la personalizada
    const finalConfig = {
      ...window.ChatWidgetConfig.defaultConfig,
      ...config
    };

    // Crear el script del widget
    const script = document.createElement('script');
    script.src = 'https://chatbox-frontend.netlify.app/static/js/widget.js';
    script.async = true;
    
    // Agregar la configuración al objeto global
    window.ChatWidgetConfig = {
      ...window.ChatWidgetConfig,
      ...finalConfig
    };

    // Crear contenedor para el widget
    const container = document.createElement('div');
    container.id = 'chat-widget';
    document.body.appendChild(container);

    // Agregar el script al documento
    document.body.appendChild(script);
  } catch (error) {
    console.error('Error al inicializar el widget:', error);
  }
}

// Inicializar el widget cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initChatWidget());
} else {
  initChatWidget();
} 