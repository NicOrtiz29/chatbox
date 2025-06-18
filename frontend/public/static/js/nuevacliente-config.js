// Configuración específica para Nueva Empresa
window.ChatWidgetConfig = {
  // URL base del backend
  apiUrl: 'https://chatbox-0r1r.onrender.com/api/chat',
  
  // Configuración específica para Nueva Empresa
  defaultConfig: {
    empresaId: 'nuevacliente',
    primaryColor: '#1976d2',  // Color principal de la marca
    secondaryColor: '#f5f5f5',
    width: '350px',
    height: '500px',
    position: 'bottom-right',
    welcomeMessage: '¡Bienvenido! ¿En qué podemos ayudarte?',
    buttonText: 'Chat',
    logo: '💬'
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