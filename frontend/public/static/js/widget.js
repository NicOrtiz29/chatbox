// Widget de chat simplificado
window.ChatWidget = {
  render: function(container, config) {
    // Crear estilos
    const styles = `
      .chat-widget {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
      }
      .chat-button {
        background-color: ${config.primaryColor};
        color: white;
        border: none;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      }
      .chat-window {
        position: fixed;
        bottom: 90px;
        right: 20px;
        width: ${config.width};
        height: ${config.height};
        background: white;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        display: none;
        flex-direction: column;
      }
      .chat-header {
        background: ${config.primaryColor};
        color: white;
        padding: 15px;
        border-radius: 10px 10px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .chat-messages {
        flex-grow: 1;
        padding: 15px;
        overflow-y: auto;
      }
      .chat-input {
        padding: 15px;
        border-top: 1px solid #eee;
        display: flex;
      }
      .chat-input input {
        flex-grow: 1;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 20px;
        margin-right: 10px;
      }
      .chat-input button {
        background: ${config.primaryColor};
        color: white;
        border: none;
        border-radius: 20px;
        padding: 10px 20px;
        cursor: pointer;
      }
      .message {
        margin: 10px 0;
        padding: 10px;
        border-radius: 10px;
        max-width: 80%;
      }
      .user-message {
        background: ${config.primaryColor};
        color: white;
        margin-left: auto;
      }
      .bot-message {
        background: ${config.secondaryColor};
        margin-right: auto;
      }
    `;

    // Agregar estilos
    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Crear HTML del widget
    const widgetHTML = `
      <div class="chat-widget">
        <button class="chat-button">💬</button>
        <div class="chat-window">
          <div class="chat-header">
            <span>${config.welcomeMessage}</span>
            <button onclick="this.parentElement.parentElement.style.display='none'">×</button>
          </div>
          <div class="chat-messages"></div>
          <div class="chat-input">
            <input type="text" placeholder="Escribe tu mensaje...">
            <button onclick="window.ChatWidget.sendMessage(this)">Enviar</button>
          </div>
        </div>
      </div>
    `;

    // Agregar widget al contenedor
    container.innerHTML = widgetHTML;

    // Agregar eventos
    const chatButton = container.querySelector('.chat-button');
    const chatWindow = container.querySelector('.chat-window');
    const input = container.querySelector('input');

    chatButton.onclick = () => {
      chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
    };

    input.onkeypress = (e) => {
      if (e.key === 'Enter') {
        this.sendMessage(input);
      }
    };

    // Mostrar mensaje de bienvenida
    this.addMessage(config.welcomeMessage, 'bot');
  },

  addMessage: function(text, type) {
    const messages = document.querySelector('.chat-messages');
    const message = document.createElement('div');
    message.className = `message ${type}-message`;
    message.textContent = text;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  },

  sendMessage: function(button) {
    const input = button.parentElement.querySelector('input');
    const message = input.value.trim();
    
    if (message) {
      // Mostrar mensaje del usuario
      this.addMessage(message, 'user');
      input.value = '';

      // Obtener la configuración actual
      const config = window.ChatWidgetConfig.defaultConfig;
      console.log('Enviando mensaje con configuración:', config);

      // Enviar al backend
      fetch(window.ChatWidgetConfig.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          message: message,
          empresa_id: config.empresaId
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data && data.response) {
          this.addMessage(data.response, 'bot');
        } else {
          throw new Error('Invalid response format');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        this.addMessage('Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.', 'bot');
      });
    }
  }
}; 