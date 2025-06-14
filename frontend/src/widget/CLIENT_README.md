# TuChat - Widget de Chat Inteligente

¡Bienvenido a TuChat! Este widget de chat inteligente puede ser integrado fácilmente en cualquier sitio web.

## Instalación Rápida

1. Agrega el siguiente código justo antes del cierre del tag `</body>` en tu sitio web:

```html
<!-- Configuración del widget -->
<script>
window.ChatWidgetConfig = {
    empresaId: 'tu-empresa-id', // ID proporcionado por TuChat
    apiUrl: 'https://api.tuchat.com', // URL de la API
    title: 'Tu Empresa Chat', // Título del chat
    primaryColor: '#1976d2', // Color principal
    secondaryColor: '#f5f5f5', // Color secundario
    width: '350px', // Ancho del widget
    height: '500px', // Alto del widget
    placeholder: '¿En qué puedo ayudarte?' // Texto del placeholder
};
</script>

<!-- Script de instalación -->
<script src="https://cdn.tuchat.com/install.js" async></script>
```

## Personalización

Puedes personalizar el widget modificando las siguientes opciones en `ChatWidgetConfig`:

| Opción | Tipo | Descripción | Valor por defecto |
|--------|------|-------------|-------------------|
| empresaId | string | ID de tu empresa | - |
| apiUrl | string | URL de la API | 'https://api.tuchat.com' |
| title | string | Título del chat | 'Chat Asistente' |
| primaryColor | string | Color principal (hex) | '#1976d2' |
| secondaryColor | string | Color secundario (hex) | '#f5f5f5' |
| width | string | Ancho del widget | '350px' |
| height | string | Alto del widget | '500px' |
| placeholder | string | Texto del placeholder | 'Escribe tu mensaje...' |

## Ejemplo de Configuración

```javascript
window.ChatWidgetConfig = {
    empresaId: 'tu-empresa-id',
    apiUrl: 'https://api.tuchat.com',
    title: 'Mi Empresa Chat',
    primaryColor: '#2E7D32', // Verde
    secondaryColor: '#E8F5E9', // Verde claro
    width: '350px',
    height: '500px',
    placeholder: '¿En qué puedo ayudarte?'
};
```

## Soporte

Para obtener soporte o ayuda con la instalación:

- Email: soporte@tuchat.com
- Teléfono: +1 234 567 890
- Horario: Lunes a Viernes 9:00 AM - 6:00 PM

## Características

- Chat inteligente basado en IA
- Personalización completa
- Diseño responsive
- Soporte para múltiples idiomas
- Integración simple
- Sin afectar el rendimiento de tu sitio

## Planes y Precios

### Plan Básico
- 1,000 mensajes/mes
- 1 empresa
- Soporte por email
- $49/mes

### Plan Profesional
- 5,000 mensajes/mes
- 3 empresas
- Soporte prioritario
- $99/mes

### Plan Empresarial
- Mensajes ilimitados
- Empresas ilimitadas
- Soporte 24/7
- $199/mes

## Seguridad

- Todos los datos se transmiten mediante HTTPS
- No almacenamos información sensible
- Cumplimiento con GDPR y CCPA
- Certificaciones de seguridad

## Actualizaciones

El widget se actualiza automáticamente. No necesitas hacer nada para recibir nuevas características y mejoras.

## Términos de Uso

Al instalar el widget, aceptas nuestros términos de uso y política de privacidad. Puedes encontrarlos en:
- https://tuchat.com/terms
- https://tuchat.com/privacy 