(function() {
  // Crear el contenedor del widget
  const container = document.createElement('div');
  container.id = 'chat-widget-container';
  document.body.appendChild(container);

  // Cargar los estilos necesarios
  const styles = document.createElement('link');
  styles.rel = 'stylesheet';
  styles.href = 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap';
  document.head.appendChild(styles);

  // Cargar el widget
  const script = document.createElement('script');
  script.src = 'https://tu-dominio.com/chat-widget.js';
  script.async = true;
  document.body.appendChild(script);

  // Configuración del widget
  window.ChatWidgetConfig = {
    apiUrl: 'https://tu-dominio.com/api/chat',
    theme: {
      primaryColor: '#1976d2',
      secondaryColor: '#f5f5f5'
    }
  };
})(); 