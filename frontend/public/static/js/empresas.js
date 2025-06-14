// Configuración de empresas
const empresas = {
  eltrebol: {
    nombre: "El Trébol Tenis",
    dominio: "eltreboltenis.netlify.app",
    config: {
      empresaId: 'eltrebol',
      primaryColor: '#4CAF50',
      secondaryColor: '#f5f5f5',
      width: '350px',
      height: '500px',
      position: 'bottom-right',
      welcomeMessage: '¡Bienvenido a El Trébol Tenis! ¿En qué podemos ayudarte?',
      buttonText: 'Chat',
      logo: '💬'
    }
  },
  // Ejemplo de nueva empresa
  nuevacliente: {
    nombre: "Nombre de la Empresa",
    dominio: "dominio.com", // Dominio donde se instalará el chat
    config: {
      empresaId: 'nuevacliente', // ID único para la empresa
      primaryColor: '#1976d2', // Color principal del chat
      secondaryColor: '#f5f5f5', // Color secundario
      width: '350px',
      height: '500px',
      position: 'bottom-right', // Posición del botón de chat
      welcomeMessage: '¡Bienvenido! ¿En qué podemos ayudarte?', // Mensaje de bienvenida
      buttonText: 'Chat', // Texto del botón
      logo: '💬' // Emoji o ícono del botón
    }
  },
  // Ejemplo de otra empresa
  techsolutions: {
    nombre: "TechSolutions S.A.",
    dominio: "techsolutions.com",
    config: {
      empresaId: 'techsolutions',
      primaryColor: '#1976d2',
      secondaryColor: '#f5f5f5',
      width: '350px',
      height: '500px',
      position: 'bottom-right',
      welcomeMessage: '¡Bienvenido a TechSolutions! ¿En qué podemos ayudarte?',
      buttonText: 'Soporte',
      logo: '💻'
    }
  }
};

// Función para detectar la empresa actual
function detectarEmpresa() {
  const hostname = window.location.hostname;
  for (const [id, empresa] of Object.entries(empresas)) {
    if (hostname.includes(empresa.dominio)) {
      return empresa;
    }
  }
  return null;
}

// Inicializar el widget automáticamente
document.addEventListener('DOMContentLoaded', function() {
  const empresa = detectarEmpresa();
  if (!empresa) {
    console.error('No se detectó una empresa configurada para este dominio');
    return;
  }

  // Configurar el widget
  window.ChatWidgetConfig = {
    apiUrl: 'http://127.0.0.1:8000/api/chat',
    defaultConfig: empresa.config
  };

  // Crear contenedor
  const container = document.createElement('div');
  container.id = 'chat-widget';
  document.body.appendChild(container);

  // Cargar el widget
  const script = document.createElement('script');
  script.src = 'http://127.0.0.1:3000/static/js/widget.js';
  script.onload = () => {
    if (window.ChatWidget) {
      window.ChatWidget.render(container, window.ChatWidgetConfig.defaultConfig);
    }
  };
  document.body.appendChild(script);
}); 