#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// URL objetivo que debería estar en todos los archivos
const TARGET_URL = 'https://chatbox-0r1r.onrender.com';

// Archivos que deberían contener la URL del backend
const FILES_TO_CHECK = [
  'src/widget/config.js',
  'src/widget/eltrebol-config.js',
  'src/widget/sgarbi-config.js',
  'src/components/AdminPanel.js',
  'scripts/copy-configs.js',
  'public/static/js/eltrebol-config.js',
  'public/static/js/nuevacliente-config.js',
  'public/static/js/empresas.js',
  'public/chat-widget.js',
  'src/widget/eltrebol-tenis.js',
  'src/widget/example.html',
  'src/widget/install.js'
];

// URLs que NO deberían estar (URLs antiguas)
const OLD_URLS = [
  'http://127.0.0.1:8000',
  'https://chatbox-backend.fly.dev',
  'https://chatbox-backend.onrender.com',
  'https://api.tuchat.com',
  'https://tu-backend-url.com'
];

// Patrones que indican uso correcto de configuración
const GOOD_PATTERNS = [
  'API_CONFIG',
  'import.*api',
  'window.API_CONFIG'
];

console.log('🔍 Verificando URLs de la API en el frontend...\n');

let allGood = true;
let checkedFiles = 0;

FILES_TO_CHECK.forEach(filePath => {
  const fullPath = path.join(__dirname, '..', filePath);
  
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    checkedFiles++;
    
    // Verificar si contiene la URL objetivo
    const hasTargetUrl = content.includes(TARGET_URL);
    
    // Verificar si contiene URLs antiguas
    const hasOldUrls = OLD_URLS.some(oldUrl => content.includes(oldUrl));
    
    // Verificar si usa configuración centralizada
    const usesGoodPatterns = GOOD_PATTERNS.some(pattern => {
      const regex = new RegExp(pattern, 'i');
      return regex.test(content);
    });
    
    if (hasTargetUrl && !hasOldUrls) {
      console.log(`✅ ${filePath}`);
    } else if (usesGoodPatterns && !hasOldUrls) {
      console.log(`✅ ${filePath} - Usa configuración centralizada`);
    } else if (hasTargetUrl && hasOldUrls) {
      console.log(`⚠️  ${filePath} - Contiene URL correcta pero también URLs antiguas`);
      allGood = false;
    } else if (!hasTargetUrl && hasOldUrls) {
      console.log(`❌ ${filePath} - Contiene URLs antiguas`);
      allGood = false;
    } else if (!hasTargetUrl && !usesGoodPatterns) {
      console.log(`❓ ${filePath} - No contiene URLs de API ni configuración centralizada`);
    } else {
      console.log(`✅ ${filePath} - Configuración válida`);
    }
  } else {
    console.log(`⚠️  ${filePath} - Archivo no encontrado`);
  }
});

console.log(`\n📊 Resumen:`);
console.log(`   - Archivos verificados: ${checkedFiles}`);
console.log(`   - URL objetivo: ${TARGET_URL}`);

if (allGood) {
  console.log('\n🎉 ¡Todas las URLs están correctamente configuradas!');
  process.exit(0);
} else {
  console.log('\n⚠️  Algunos archivos necesitan ser actualizados.');
  process.exit(1);
} 