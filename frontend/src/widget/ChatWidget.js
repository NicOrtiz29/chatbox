import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Paper, 
  Typography, 
  IconButton,
  Collapse,
  styled
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

// Estilos personalizables
const WidgetContainer = styled(Box)(({ theme, config }) => ({
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
}));

const ChatButton = styled(IconButton)(({ theme, config }) => ({
  backgroundColor: config.primaryColor || '#1976d2',
  color: 'white',
  '&:hover': {
    backgroundColor: config.primaryColor || '#1565c0',
  },
  width: '60px',
  height: '60px',
  marginBottom: '10px',
}));

const ChatWindow = styled(Paper)(({ theme, config }) => ({
  width: config.width || '350px',
  height: config.height || '500px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: config.backgroundColor || 'white',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  borderRadius: '12px',
  overflow: 'hidden',
}));

const MessageBubble = styled(Box)(({ theme, isUser, config }) => ({
  maxWidth: '80%',
  padding: '10px 15px',
  borderRadius: '15px',
  margin: '5px',
  backgroundColor: isUser ? (config.primaryColor || '#1976d2') : (config.secondaryColor || '#f5f5f5'),
  color: isUser ? 'white' : 'black',
  alignSelf: isUser ? 'flex-end' : 'flex-start',
}));

function ChatWidget({ config = {} }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Configurar axios
  const api = axios.create({
    baseURL: config.apiUrl || 'http://127.0.0.1:8000',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    timeout: 10000,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await api.post('/api/chat', {
        message: userMessage,
        empresa_id: config.empresaId
      });

      setMessages(prev => [...prev, { role: 'assistant', content: response.data.response }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Lo siento, hubo un error al procesar tu mensaje.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WidgetContainer config={config}>
      <ChatButton 
        onClick={() => setIsOpen(!isOpen)}
        config={config}
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </ChatButton>
      
      <Collapse in={isOpen}>
        <ChatWindow config={config}>
          <Box sx={{ 
            p: 2, 
            bgcolor: config.primaryColor || '#1976d2',
            color: 'white'
          }}>
            <Typography variant="h6">
              {config.title || 'Chat Asistente'}
            </Typography>
          </Box>
          
          <Box sx={{ 
            flex: 1, 
            overflow: 'auto', 
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}>
            {messages.map((message, index) => (
              <MessageBubble 
                key={index}
                isUser={message.role === 'user'}
                config={config}
              >
                {message.content}
              </MessageBubble>
            ))}
            <div ref={messagesEndRef} />
          </Box>

          <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                placeholder={config.placeholder || "Escribe tu mensaje..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                disabled={isLoading}
              />
              <Button 
                variant="contained" 
                endIcon={<SendIcon />}
                onClick={handleSend}
                disabled={isLoading}
                sx={{ 
                  bgcolor: config.primaryColor || '#1976d2',
                  '&:hover': {
                    bgcolor: config.primaryColor || '#1565c0',
                  }
                }}
              >
                Enviar
              </Button>
            </Box>
          </Box>
        </ChatWindow>
      </Collapse>
    </WidgetContainer>
  );
}

export default ChatWidget; 