const fs = require('fs');
const path = require('path');

// Directorios
const srcDir = path.join(__dirname, '../src/widget');
const destDir = path.join(__dirname, '../build/static/js');

// Asegurarse de que el directorio de destino existe
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Archivos a copiar
const filesToCopy = [
  'sgarbi-config.js',
  'eltrebol-config.js',
  'nuevacliente-config.js'
];

// Copiar cada archivo
filesToCopy.forEach(file => {
  const srcPath = path.join(srcDir, file);
  const destPath = path.join(destDir, file);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copiado: ${file}`);
  } else {
    console.error(`Archivo no encontrado: ${file}`);
  }
}); 