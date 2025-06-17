// Configuración específica para El Trébol
window.ChatWidgetConfig = {
  // URL base del backend
  apiUrl: 'https://chatbox-backend.onrender.com/api/chat',
  
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

// Función para inicializar el widget
function initChatWidget(config = {}) {
  // Combinar la configuración por defecto con la personalizada
  const finalConfig = {
    ...window.ChatWidgetConfig.defaultConfig,
    ...config
  };

  // Crear el script del widget
  const script = document.createElement('script');
  script.src = 'http://127.0.0.1:3000/static/js/widget.js';  // URL local para pruebas
  script.async = true;
  
  // Agregar la configuración al objeto global
  window.ChatWidgetConfig = {
    ...window.ChatWidgetConfig,
    ...finalConfig
  };

  // Agregar el script al documento
  document.body.appendChild(script);
}

// Script de inicialización
(function() {
    // Cargar dependencias
    const loadScript = (src) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    };

    // Cargar estilos
    const loadStyles = () => {
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
    };

    // Inicializar el widget
    const initWidget = async () => {
        try {
            // Cargar estilos
            loadStyles();

            // Cargar scripts
            await Promise.all([
                loadScript('https://unpkg.com/react@17/umd/react.production.min.js'),
                loadScript('https://unpkg.com/react-dom@17/umd/react-dom.production.min.js'),
                loadScript('https://unpkg.com/@mui/material@5.0.0/umd/material-ui.production.min.js'),
                loadScript('https://unpkg.com/axios/dist/axios.min.js'),
                loadScript('https://unpkg.com/@babel/standalone/babel.min.js')
            ]);

            // Crear contenedor
            const container = document.createElement('div');
            container.id = 'chat-widget';
            document.body.appendChild(container);

            // Renderizar widget
            ReactDOM.render(
                <ChatWidget config={window.ChatWidgetConfig.defaultConfig} />,
                document.getElementById('chat-widget')
            );
        } catch (error) {
            console.error('Error al inicializar el widget:', error);
        }
    };

    // Iniciar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
})(); 