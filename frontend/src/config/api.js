// Configuración centralizada de la API
const API_CONFIG = {
  // URL base del backend
  BASE_URL: 'https://chatbox-0r1r.onrender.com',
  
  // Endpoints
  ENDPOINTS: {
    CHAT: '/api/chat',
    EMPRESAS: '/api/empresas',
    HEALTH: '/health'
  },
  
  // URLs completas
  get CHAT_URL() {
    return `${this.BASE_URL}${this.ENDPOINTS.CHAT}`;
  },
  
  get EMPRESAS_URL() {
    return `${this.BASE_URL}${this.ENDPOINTS.EMPRESAS}`;
  },
  
  get HEALTH_URL() {
    return `${this.BASE_URL}${this.ENDPOINTS.HEALTH}`;
  }
};

// Exportar para uso en módulos ES6
if (typeof module !== 'undefined' && module.exports) {
  module.exports = API_CONFIG;
}

// Exportar para uso en navegador
if (typeof window !== 'undefined') {
  window.API_CONFIG = API_CONFIG;
} 