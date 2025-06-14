# Widget de Chat Personalizable

Este widget permite integrar un chat asistente en cualquier sitio web, con la capacidad de personalizar su apariencia y comportamiento.

## Características

- Diseño moderno y responsive
- Personalización completa de colores y dimensiones
- Integración con el backend de chat existente
- Soporte para múltiples empresas
- Interfaz intuitiva y fácil de usar

## Instalación

1. Incluye las dependencias necesarias en tu HTML:

```html
<!-- Material UI -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
<!-- React y ReactDOM -->
<script src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
<!-- Material UI -->
<script src="https://unpkg.com/@mui/material@5.0.0/umd/material-ui.production.min.js"></script>
<!-- Axios -->
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<!-- Babel para JSX -->
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

2. Agrega un contenedor para el widget:

```html
<div id="chat-widget"></div>
```

3. Configura y renderiza el widget:

```javascript
const config = {
    empresaId: 'techsolutions', // ID de la empresa
    apiUrl: 'http://127.0.0.1:8000', // URL del backend
    title: 'TechSolutions Chat', // Título del chat
    primaryColor: '#1976d2', // Color primario
    secondaryColor: '#f5f5f5', // Color secundario
    width: '350px', // Ancho del widget
    height: '500px', // Alto del widget
    placeholder: '¿En qué puedo ayudarte?' // Placeholder del input
};

ReactDOM.render(
    <ChatWidget config={config} />,
    document.getElementById('chat-widget')
);
```

## Opciones de Configuración

| Opción | Tipo | Descripción | Valor por defecto |
|--------|------|-------------|-------------------|
| empresaId | string | ID de la empresa en el backend | - |
| apiUrl | string | URL del backend | 'http://127.0.0.1:8000' |
| title | string | Título del chat | 'Chat Asistente' |
| primaryColor | string | Color primario (hex) | '#1976d2' |
| secondaryColor | string | Color secundario (hex) | '#f5f5f5' |
| width | string | Ancho del widget | '350px' |
| height | string | Alto del widget | '500px' |
| placeholder | string | Texto del placeholder | 'Escribe tu mensaje...' |

## Ejemplo de Uso

Ver el archivo `example.html` para un ejemplo completo de implementación.

## Notas Importantes

1. Asegúrate de que el backend esté configurado y funcionando correctamente.
2. El `empresaId` debe corresponder con una empresa válida en el backend.
3. La URL del backend debe ser accesible desde el sitio donde se integra el widget.
4. Para producción, considera usar versiones minificadas de las dependencias.

## Personalización Adicional

El widget utiliza Material-UI, por lo que puedes personalizar aún más su apariencia utilizando los temas y estilos de Material-UI. Consulta la [documentación de Material-UI](https://mui.com/) para más detalles. 