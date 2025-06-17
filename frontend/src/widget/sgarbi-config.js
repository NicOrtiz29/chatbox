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
    script.onload = () => {
      console.log(`Script cargado: ${src}`);
      resolve();
    };
    script.onerror = (error) => {
      console.error(`Error al cargar script ${src}:`, error);
      reject(error);
    };
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
    console.log(`Estilo cargado: ${href}`);
  });
}

// Función para inicializar el widget
async function initChatWidget(config = {}) {
  try {
    console.log('Iniciando carga del widget...');
    
    // Cargar estilos
    loadStyles();

    // Cargar dependencias
    console.log('Cargando dependencias...');
    await Promise.all([
      loadScript('https://unpkg.com/react@17/umd/react.production.min.js'),
      loadScript('https://unpkg.com/react-dom@17/umd/react-dom.production.min.js'),
      loadScript('https://unpkg.com/@mui/material@5.0.0/umd/material-ui.production.min.js'),
      loadScript('https://unpkg.com/axios/dist/axios.min.js')
    ]);
    console.log('Dependencias cargadas');

    // Combinar la configuración por defecto con la personalizada
    const finalConfig = {
      ...window.ChatWidgetConfig.defaultConfig,
      ...config
    };

    // Crear contenedor para el widget
    const container = document.createElement('div');
    container.id = 'chat-widget';
    document.body.appendChild(container);
    console.log('Contenedor del widget creado');

    // Crear el script del widget
    const script = document.createElement('script');
    script.src = 'https://chatbox-frontend.netlify.app/static/js/widget.js';
    script.async = true;
    script.onload = () => {
      console.log('Widget cargado correctamente');
      // Agregar la configuración al objeto global
      window.ChatWidgetConfig = {
        ...window.ChatWidgetConfig,
        ...finalConfig
      };
      // Inicializar el widget
      if (window.initWidget) {
        window.initWidget();
      }
    };
    script.onerror = (error) => {
      console.error('Error al cargar el widget:', error);
    };
    
    // Agregar el script al documento
    document.body.appendChild(script);
  } catch (error) {
    console.error('Error al inicializar el widget:', error);
  }
}

// Función para verificar si el script se cargó correctamente
function checkScriptLoaded() {
  console.log('Verificando carga del script...');
  if (window.ChatWidgetConfig) {
    console.log('✅ Script de configuración cargado correctamente');
    return true;
  } else {
    console.error('❌ Error: Script de configuración no cargado');
    return false;
  }
}

// Inicializar el widget cuando el DOM esté listo
console.log('Script de configuración cargado');
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado, iniciando widget...');
    if (checkScriptLoaded()) {
      initChatWidget();
    }
  });
} else {
  console.log('DOM ya cargado, iniciando widget...');
  if (checkScriptLoaded()) {
    initChatWidget();
  }
} 