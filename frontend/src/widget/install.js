// Script de instalación del Chat Widget
(function() {
    // Configuración por defecto
    const defaultConfig = {
        apiUrl: 'https://chatbox-0r1r.onrender.com/api/chat', // URL de tu API en producción
        position: 'bottom-right',
        width: '350px',
        height: '500px',
        primaryColor: '#1976d2',
        secondaryColor: '#f5f5f5'
    };

    // Función para cargar scripts
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

    // Función para cargar estilos
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

    // Función para inicializar el widget
    const initWidget = async (config) => {
        try {
            // Cargar estilos
            loadStyles();

            // Cargar scripts
            await Promise.all([
                loadScript('https://unpkg.com/react@17/umd/react.production.min.js'),
                loadScript('https://unpkg.com/react-dom@17/umd/react-dom.production.min.js'),
                loadScript('https://unpkg.com/@mui/material@5.0.0/umd/material-ui.production.min.js'),
                loadScript('https://unpkg.com/axios/dist/axios.min.js'),
                loadScript('https://unpkg.com/@babel/standalone/babel.min.js'),
                loadScript('https://cdn.tuchat.com/widget.js') // Tu widget compilado
            ]);

            // Crear contenedor
            const container = document.createElement('div');
            container.id = 'chat-widget';
            document.body.appendChild(container);

            // Renderizar widget
            ReactDOM.render(
                <ChatWidget config={config} />,
                document.getElementById('chat-widget')
            );
        } catch (error) {
            console.error('Error al inicializar el widget:', error);
        }
    };

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            const config = window.ChatWidgetConfig || defaultConfig;
            initWidget(config);
        });
    } else {
        const config = window.ChatWidgetConfig || defaultConfig;
        initWidget(config);
    }
})(); 