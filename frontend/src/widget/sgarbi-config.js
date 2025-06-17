// Configuración específica para Sgarbi
console.log('Iniciando carga de sgarbi-config.js...');

// Verificar si ya existe una configuración
if (window.ChatWidgetConfig) {
    console.warn('⚠️ Ya existe una configuración del widget. Sobrescribiendo...');
}

window.ChatWidgetConfig = {
    // URL base del backend
    apiUrl: 'http://localhost:8000',
    
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
        console.log(`Intentando cargar script: ${src}`);
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => {
            console.log(`✅ Script cargado exitosamente: ${src}`);
            resolve();
        };
        script.onerror = (error) => {
            console.error(`❌ Error al cargar script ${src}:`, error);
            reject(error);
        };
        document.head.appendChild(script);
    });
}

// Función para cargar estilos
function loadStyles() {
    console.log('Cargando estilos...');
    const links = [
        'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap',
        'https://fonts.googleapis.com/icon?family=Material+Icons'
    ];
    
    links.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
        console.log(`✅ Estilo cargado: ${href}`);
    });
}

// Función para verificar si el contenedor existe
function checkContainer() {
    const container = document.getElementById('chat-widget');
    if (!container) {
        console.error('❌ No se encontró el contenedor del widget');
        return false;
    }
    console.log('✅ Contenedor del widget encontrado');
    return true;
}

// Función para inicializar el widget
async function initChatWidget(config = {}) {
    try {
        console.log('Iniciando carga del widget...');
        
        // Verificar contenedor
        if (!checkContainer()) {
            throw new Error('No se encontró el contenedor del widget');
        }
        
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
        console.log('✅ Dependencias cargadas');

        // Combinar la configuración por defecto con la personalizada
        const finalConfig = {
            ...window.ChatWidgetConfig.defaultConfig,
            ...config
        };

        // Crear el script del widget
        const script = document.createElement('script');
        script.src = 'https://chatbox-frontend.netlify.app/static/js/widget.js';
        script.async = true;
        script.onload = () => {
            console.log('✅ Widget cargado correctamente');
            // Agregar la configuración al objeto global
            window.ChatWidgetConfig = {
                ...window.ChatWidgetConfig,
                ...finalConfig
            };
            // Inicializar el widget
            if (window.initWidget) {
                window.initWidget();
            } else {
                console.error('❌ Función initWidget no encontrada');
            }
        };
        script.onerror = (error) => {
            console.error('❌ Error al cargar el widget:', error);
        };
        
        // Agregar el script al documento
        document.body.appendChild(script);
    } catch (error) {
        console.error('❌ Error al inicializar el widget:', error);
    }
}

// Inicializar el widget cuando el DOM esté listo
console.log('Script de configuración cargado');
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM cargado, iniciando widget...');
        initChatWidget();
    });
} else {
    console.log('DOM ya cargado, iniciando widget...');
    initChatWidget();
} 