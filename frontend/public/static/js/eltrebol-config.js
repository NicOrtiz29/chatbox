// Configuración específica para El Trébol
window.ChatWidgetConfig = {
  // URL base del backend
  apiUrl: 'http://127.0.0.1:8000/api/chat',
  
  // Configuración específica para El Trébol
  defaultConfig: {
    empresaId: 'eltrebol',
    primaryColor: '#4CAF50',  // Verde que combina con el tema de tenis
    secondaryColor: '#f5f5f5',
    width: '350px',
    height: '500px',
    position: 'bottom-right',
    welcomeMessage: '¡Bienvenido a El Trébol Tenis! ¿En qué podemos ayudarte?',
    buttonText: 'Chat'
  }
};

// Inicializar el widget automáticamente
document.addEventListener('DOMContentLoaded', function() {
  const container = document.createElement('div');
  container.id = 'chat-widget';
  document.body.appendChild(container);

  const script = document.createElement('script');
  script.src = 'http://127.0.0.1:3000/static/js/widget.js';
  script.onload = () => {
    if (window.ChatWidget) {
      window.ChatWidget.render(container, window.ChatWidgetConfig.defaultConfig);
    }
  };
  document.body.appendChild(script);
});

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
      loadScript('https://unpkg.com/axios/dist/axios.min.js'),
      loadScript('https://unpkg.com/@babel/standalone/babel.min.js')
    ]);

    // Combinar la configuración
    const finalConfig = {
      ...window.ChatWidgetConfig.defaultConfig,
      ...config
    };

    // Crear contenedor
    const container = document.createElement('div');
    container.id = 'chat-widget';
    document.body.appendChild(container);

    // Cargar el widget
    await loadScript('http://127.0.0.1:3000/static/js/widget.js');

    // Renderizar el widget
    if (window.ChatWidget) {
      window.ChatWidget.render(container, finalConfig);
    } else {
      console.error('El widget no está disponible');
    }
  } catch (error) {
    console.error('Error al inicializar el widget:', error);
  }
} 