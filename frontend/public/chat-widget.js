(function(){
    // 1. Detectar empresaId
    function getEmpresaId() {
        // a) Desde window.ChatWidgetConfig
        if (window.ChatWidgetConfig && window.ChatWidgetConfig.empresaId) {
            return window.ChatWidgetConfig.empresaId;
        }
        // b) Desde atributo en el <script>
        const currentScript = document.currentScript || (function() {
            var scripts = document.getElementsByTagName('script');
            return scripts[scripts.length - 1];
        })();
        if (currentScript && currentScript.getAttribute('empresa-id')) {
            return currentScript.getAttribute('empresa-id');
        }
        // c) Desde el dominio (opcional, si quieres autodetección)
        // return window.location.hostname.split('.')[0];
        return null;
    }

    const empresaId = getEmpresaId();
    if (!empresaId) {
        console.error('[ChatWidget] No se encontró empresaId. Usa window.ChatWidgetConfig.empresaId o <script empresa-id="...">');
        return;
    }

    // 2. Configuración de la URL del backend
    const apiBase = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://127.0.0.1:8000'
        : 'https://chatbox-0r1r.onrender.com';
    const apiUrl = apiBase + '/api/chat';
    const empresasUrl = apiBase + '/api/empresas/' + empresaId;

    // 3. Obtener configuración de la empresa desde el backend
    fetch(apiBase + '/api/empresas')
        .then(res => res.json())
        .then(empresas => {
            const empresa = empresas[empresaId];
            if (!empresa) {
                throw new Error('No se encontró la configuración para la empresa: ' + empresaId);
            }
            renderChatWidget(empresa.config);
        })
        .catch(err => {
            console.error('[ChatWidget] Error al obtener configuración:', err);
        });

    // 4. Renderizar el chat widget
    function renderChatWidget(config) {
        // Eliminar cualquier widget existente
        const old = document.getElementById('chat-widget-container');
        if (old) old.remove();

        const container = document.createElement('div');
        container.id = 'chat-widget-container';
        container.style.position = 'fixed';
        container.style.right = '20px';
        container.style.zIndex = '9999';
        document.body.appendChild(container);

        // Botón flotante
        const chatButton = document.createElement('button');
        chatButton.innerHTML = config.buttonText || '💬';
        chatButton.style.backgroundColor = config.primaryColor || '#1976d2';
        chatButton.style.color = 'white';
        chatButton.style.border = 'none';
        chatButton.style.borderRadius = '50%';
        chatButton.style.width = '60px';
        chatButton.style.height = '60px';
        chatButton.style.fontSize = '30px';
        chatButton.style.display = 'flex';
        chatButton.style.justifyContent = 'center';
        chatButton.style.alignItems = 'center';
        chatButton.style.cursor = 'pointer';
        chatButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        chatButton.style.transition = 'transform 0.2s ease-in-out';
        chatButton.style.position = 'absolute';
        chatButton.style.bottom = '0';
        chatButton.style.right = '0';
        container.appendChild(chatButton);

        // Ventana de chat
        const chatWindow = document.createElement('div');
        chatWindow.style.display = 'none';
        chatWindow.style.position = 'absolute';
        chatWindow.style.right = '0';
        chatWindow.style.bottom = '70px';
        chatWindow.style.width = config.width || '350px';
        chatWindow.style.height = config.height || '500px';
        chatWindow.style.backgroundColor = 'white';
        chatWindow.style.borderRadius = '10px';
        chatWindow.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        chatWindow.style.zIndex = '9998';
        container.appendChild(chatWindow);

        // Header
        const chatHeader = document.createElement('div');
        chatHeader.style.padding = '15px';
        chatHeader.style.backgroundColor = config.primaryColor || '#1976d2';
        chatHeader.style.color = 'white';
        chatHeader.style.borderRadius = '10px 10px 0 0';
        chatHeader.style.display = 'flex';
        chatHeader.style.justifyContent = 'space-between';
        chatHeader.style.alignItems = 'center';
        chatWindow.appendChild(chatHeader);

        const chatTitle = document.createElement('h3');
        chatTitle.innerHTML = config.title || 'Chat';
        chatTitle.style.margin = '0';
        chatHeader.appendChild(chatTitle);

        const closeButton = document.createElement('button');
        closeButton.innerHTML = '×';
        closeButton.style.background = 'none';
        closeButton.style.border = 'none';
        closeButton.style.color = 'white';
        closeButton.style.fontSize = '24px';
        closeButton.style.cursor = 'pointer';
        chatHeader.appendChild(closeButton);

        // Área de mensajes
        const messagesArea = document.createElement('div');
        messagesArea.style.height = 'calc(100% - 130px)';
        messagesArea.style.overflowY = 'auto';
        messagesArea.style.padding = '15px';
        chatWindow.appendChild(messagesArea);

        // Área de entrada
        const inputArea = document.createElement('div');
        inputArea.style.padding = '15px';
        inputArea.style.borderTop = '1px solid #eee';
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = config.placeholder || 'Escribe tu mensaje...';
        input.style.width = 'calc(100% - 70px)';
        input.style.padding = '8px';
        input.style.border = '1px solid #ddd';
        input.style.borderRadius = '4px';
        const sendButton = document.createElement('button');
        sendButton.innerHTML = '➤';
        sendButton.style.width = '40px';
        sendButton.style.height = '35px';
        sendButton.style.marginLeft = '10px';
        sendButton.style.backgroundColor = config.primaryColor || '#1976d2';
        sendButton.style.color = 'white';
        sendButton.style.border = 'none';
        sendButton.style.borderRadius = '4px';
        sendButton.style.cursor = 'pointer';
        inputArea.appendChild(input);
        inputArea.appendChild(sendButton);
        chatWindow.appendChild(inputArea);

        // Abrir/cerrar chat
        chatButton.onclick = () => {
            chatWindow.style.display = 'block';
            chatButton.style.display = 'none';
        };
        closeButton.onclick = () => {
            chatWindow.style.display = 'none';
            chatButton.style.display = 'block';
        };

        // Enviar mensajes
        async function sendMessage() {
            const message = input.value.trim();
            if (!message) return;
            // Mostrar mensaje del usuario
            const userMessage = document.createElement('div');
            userMessage.textContent = message;
            userMessage.style.backgroundColor = '#e3f2fd';
            userMessage.style.padding = '10px';
            userMessage.style.margin = '5px';
            userMessage.style.borderRadius = '5px';
            userMessage.style.alignSelf = 'flex-end';
            messagesArea.appendChild(userMessage);
            input.value = '';
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: message,
                        empresa_id: empresaId
                    }),
                });
                const data = await response.json();
                // Mostrar respuesta del bot
                const botMessage = document.createElement('div');
                botMessage.textContent = data.response;
                botMessage.style.backgroundColor = '#f5f5f5';
                botMessage.style.padding = '10px';
                botMessage.style.margin = '5px';
                botMessage.style.borderRadius = '5px';
                botMessage.style.alignSelf = 'flex-start';
                messagesArea.appendChild(botMessage);
                messagesArea.scrollTop = messagesArea.scrollHeight;
            } catch (error) {
                console.error('[ChatWidget] Error:', error);
                const errorMsg = document.createElement('div');
                errorMsg.textContent = 'Lo siento, hubo un error al procesar tu mensaje.';
                errorMsg.style.backgroundColor = '#ffcdd2';
                errorMsg.style.padding = '10px';
                errorMsg.style.margin = '5px';
                errorMsg.style.borderRadius = '5px';
                errorMsg.style.alignSelf = 'flex-start';
                messagesArea.appendChild(errorMsg);
            }
        }
        sendButton.onclick = sendMessage;
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') sendMessage();
        });
        // Mensaje de bienvenida
        if (config.welcomeMessage) {
            const welcome = document.createElement('div');
            welcome.textContent = config.welcomeMessage;
            welcome.style.backgroundColor = '#f5f5f5';
            welcome.style.padding = '10px';
            welcome.style.margin = '5px';
            welcome.style.borderRadius = '5px';
            welcome.style.alignSelf = 'flex-start';
            messagesArea.appendChild(welcome);
        }
    }
})(); 