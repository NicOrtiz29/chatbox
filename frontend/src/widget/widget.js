// Widget de Chat
console.log('Iniciando carga del widget.js...');

const ChatWidget = ({ config }) => {
    console.log('Configuración recibida:', config);
    const [isOpen, setIsOpen] = React.useState(false);
    const [messages, setMessages] = React.useState([]);
    const [input, setInput] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const messagesEndRef = React.useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    React.useEffect(() => {
        console.log('Widget montado, config:', config);
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            console.log('Enviando mensaje a:', `${config.apiUrl}/api/chat`);
            const response = await axios.post(`${config.apiUrl}/api/chat`, {
                message: userMessage,
                empresa_id: config.empresaId
            });

            console.log('Respuesta recibida:', response.data);
            setMessages(prev => [...prev, { role: 'assistant', content: response.data.response }]);
        } catch (error) {
            console.error('Error al enviar mensaje:', error);
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta nuevamente.'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return React.createElement('div', {
        style: {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end'
        }
    }, [
        React.createElement('button', {
            onClick: () => {
                console.log('Botón de chat clickeado, estado actual:', isOpen);
                setIsOpen(!isOpen);
            },
            style: {
                backgroundColor: config.primaryColor,
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '60px',
                height: '60px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                marginBottom: '10px'
            }
        }, isOpen ? '✕' : '💬'),
        
        isOpen && React.createElement('div', {
            style: {
                width: config.width,
                height: config.height,
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }
        }, [
            React.createElement('div', {
                style: {
                    padding: '16px',
                    backgroundColor: config.primaryColor,
                    color: 'white'
                }
            }, config.title),
            
            React.createElement('div', {
                style: {
                    flex: 1,
                    overflow: 'auto',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                }
            }, messages.map((message, index) => 
                React.createElement('div', {
                    key: index,
                    style: {
                        maxWidth: '80%',
                        padding: '10px 15px',
                        borderRadius: '15px',
                        backgroundColor: message.role === 'user' ? config.primaryColor : config.secondaryColor,
                        color: message.role === 'user' ? 'white' : 'black',
                        alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start'
                    }
                }, message.content)
            ), React.createElement('div', { ref: messagesEndRef })),
            
            React.createElement('div', {
                style: {
                    padding: '16px',
                    borderTop: '1px solid #eee',
                    display: 'flex',
                    gap: '8px'
                }
            }, [
                React.createElement('input', {
                    type: 'text',
                    value: input,
                    onChange: (e) => setInput(e.target.value),
                    onKeyPress: (e) => e.key === 'Enter' && handleSend(),
                    placeholder: config.placeholder,
                    disabled: isLoading,
                    style: {
                        flex: 1,
                        padding: '8px 12px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px'
                    }
                }),
                React.createElement('button', {
                    onClick: handleSend,
                    disabled: isLoading,
                    style: {
                        backgroundColor: config.primaryColor,
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '8px 16px',
                        cursor: 'pointer'
                    }
                }, isLoading ? 'Enviando...' : 'Enviar')
            ])
        ])
    ]);
};

// Función para inicializar el widget
window.initWidget = function() {
    console.log('Inicializando widget...');
    try {
        if (!window.ChatWidgetConfig) {
            throw new Error('Configuración no encontrada');
        }
        
        const config = window.ChatWidgetConfig.defaultConfig;
        console.log('Configuración del widget:', config);
        
        const container = document.getElementById('chat-widget');
        if (!container) {
            throw new Error('Contenedor del widget no encontrado');
        }
        
        ReactDOM.render(
            React.createElement(ChatWidget, { config }),
            container
        );
        console.log('Widget renderizado exitosamente');
    } catch (error) {
        console.error('Error al inicializar el widget:', error);
    }
};

console.log('Widget.js cargado correctamente'); 