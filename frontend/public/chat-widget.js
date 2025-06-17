(function(){
    // Configuración de URLs
    const config = {
        apiUrl: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
            ? 'http://127.0.0.1:8000/api/chat'
            : 'https://tu-backend-url.com/api/chat'
    };

    // Función para detectar elementos flotantes
    function detectarElementosFlotantes() {
        const elementos = document.querySelectorAll('*');
        const flotantes = [];
        
        elementos.forEach(elemento => {
            const estilo = window.getComputedStyle(elemento);
            if (estilo.position === 'fixed' && 
                (estilo.bottom !== 'auto' || estilo.right !== 'auto')) {
                flotantes.push({
                    elemento: elemento,
                    bottom: parseInt(estilo.bottom) || 0,
                    right: parseInt(estilo.right) || 0
                });
            }
        });
        
        return flotantes;
    }

    // Función para ajustar la posición del chat
    function ajustarPosicionChat(container, chatWindow) {
        const flotantes = detectarElementosFlotantes();
        let espacioNecesario = 80; // Altura del botón + margen
        
        flotantes.forEach(flotante => {
            if (flotante.elemento !== container) {
                const rect = flotante.elemento.getBoundingClientRect();
                if (rect.bottom > window.innerHeight - espacioNecesario) {
                    espacioNecesario += rect.height + 20; // Altura del elemento + margen
                }
            }
        });
        
        container.style.bottom = `${espacioNecesario}px`;
        chatWindow.style.bottom = `${espacioNecesario + 60}px`;
    }

    const container = document.createElement("div");
    container.id = "chat-widget-container";
    container.style.position = "fixed";
    container.style.right = "20px";
    container.style.zIndex = "9999";
    
    // Crear el botón del chat
    const chatButton = document.createElement("button");
    chatButton.innerHTML = "💬";
    chatButton.style.backgroundColor = "#1976d2";
    chatButton.style.color = "white";
    chatButton.style.border = "none";
    chatButton.style.borderRadius = "50%";
    chatButton.style.width = "60px";
    chatButton.style.height = "60px";
    chatButton.style.fontSize = "30px";
    chatButton.style.display = "flex";
    chatButton.style.justifyContent = "center";
    chatButton.style.alignItems = "center";
    chatButton.style.cursor = "pointer";
    chatButton.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
    chatButton.style.transition = "transform 0.2s ease-in-out";
    
    // Efecto hover
    chatButton.onmouseover = () => {
        chatButton.style.transform = "scale(1.1)";
    };
    chatButton.onmouseout = () => {
        chatButton.style.transform = "scale(1)";
    };
    
    // Crear el contenedor del chat
    const chatWindow = document.createElement("div");
    chatWindow.style.display = "none";
    chatWindow.style.position = "fixed";
    chatWindow.style.right = "20px";
    chatWindow.style.width = "350px";
    chatWindow.style.height = "500px";
    chatWindow.style.backgroundColor = "white";
    chatWindow.style.borderRadius = "10px";
    chatWindow.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";
    chatWindow.style.zIndex = "9998";
    
    // Crear el header del chat
    const chatHeader = document.createElement("div");
    chatHeader.style.padding = "15px";
    chatHeader.style.backgroundColor = "#1976d2";
    chatHeader.style.color = "white";
    chatHeader.style.borderRadius = "10px 10px 0 0";
    chatHeader.style.display = "flex";
    chatHeader.style.justifyContent = "space-between";
    chatHeader.style.alignItems = "center";
    
    const chatTitle = document.createElement("h3");
    chatTitle.innerHTML = "Chat Sgarbi";
    chatTitle.style.margin = "0";
    
    const closeButton = document.createElement("button");
    closeButton.innerHTML = "×";
    closeButton.style.background = "none";
    closeButton.style.border = "none";
    closeButton.style.color = "white";
    closeButton.style.fontSize = "24px";
    closeButton.style.cursor = "pointer";
    
    chatHeader.appendChild(chatTitle);
    chatHeader.appendChild(closeButton);
    chatWindow.appendChild(chatHeader);
    
    // Agregar el área de mensajes
    const messagesArea = document.createElement("div");
    messagesArea.style.height = "calc(100% - 130px)";
    messagesArea.style.overflowY = "auto";
    messagesArea.style.padding = "15px";
    chatWindow.appendChild(messagesArea);
    
    // Agregar el área de entrada
    const inputArea = document.createElement("div");
    inputArea.style.padding = "15px";
    inputArea.style.borderTop = "1px solid #eee";
    
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Escribe tu mensaje...";
    input.style.width = "calc(100% - 70px)";
    input.style.padding = "8px";
    input.style.border = "1px solid #ddd";
    input.style.borderRadius = "4px";
    
    const sendButton = document.createElement("button");
    sendButton.innerHTML = "➤";
    sendButton.style.width = "40px";
    sendButton.style.height = "35px";
    sendButton.style.marginLeft = "10px";
    sendButton.style.backgroundColor = "#1976d2";
    sendButton.style.color = "white";
    sendButton.style.border = "none";
    sendButton.style.borderRadius = "4px";
    sendButton.style.cursor = "pointer";
    
    inputArea.appendChild(input);
    inputArea.appendChild(sendButton);
    chatWindow.appendChild(inputArea);
    
    // Funcionalidad para abrir/cerrar el chat
    chatButton.onclick = () => {
        chatWindow.style.display = "block";
        chatButton.style.display = "none";
    };
    
    closeButton.onclick = () => {
        chatWindow.style.display = "none";
        chatButton.style.display = "block";
    };
    
    // Funcionalidad para enviar mensajes
    async function sendMessage() {
        const message = input.value.trim();
        if (!message) return;

        // Agregar mensaje del usuario
        const userMessage = document.createElement("div");
        userMessage.textContent = message;
        userMessage.style.backgroundColor = "#e3f2fd";
        userMessage.style.padding = "10px";
        userMessage.style.margin = "5px";
        userMessage.style.borderRadius = "5px";
        userMessage.style.alignSelf = "flex-end";
        messagesArea.appendChild(userMessage);

        input.value = "";

        try {
            const response = await fetch(config.apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: message,
                    empresa: "sgarbi"
                }),
            });

            const data = await response.json();
            
            // Agregar respuesta del bot
            const botMessage = document.createElement("div");
            botMessage.textContent = data.response;
            botMessage.style.backgroundColor = "#f5f5f5";
            botMessage.style.padding = "10px";
            botMessage.style.margin = "5px";
            botMessage.style.borderRadius = "5px";
            botMessage.style.alignSelf = "flex-start";
            messagesArea.appendChild(botMessage);

            // Scroll al final
            messagesArea.scrollTop = messagesArea.scrollHeight;
        } catch (error) {
            console.error("Error:", error);
            const errorMessage = document.createElement("div");
            errorMessage.textContent = "Lo siento, hubo un error al procesar tu mensaje.";
            errorMessage.style.color = "red";
            errorMessage.style.padding = "10px";
            errorMessage.style.margin = "5px";
            messagesArea.appendChild(errorMessage);
        }
    }
    
    sendButton.onclick = sendMessage;
    input.onkeypress = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };
    
    // Ajustar la posición inicial
    ajustarPosicionChat(container, chatWindow);
    
    // Ajustar la posición cuando cambia el tamaño de la ventana
    window.addEventListener('resize', () => {
        ajustarPosicionChat(container, chatWindow);
    });
    
    // Ajustar la posición cuando se carga la página
    window.addEventListener('load', () => {
        ajustarPosicionChat(container, chatWindow);
    });
    
    container.appendChild(chatButton);
    container.appendChild(chatWindow);
    document.body.appendChild(container);
    
    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href = "http://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap";
    document.head.appendChild(fontLink);
    
    window.ChatWidgetConfig = {
        apiUrl: config.apiUrl,
        theme: {
            primaryColor: "#1976d2",
            secondaryColor: "#f5f5f5"
        }
    };
})(); 