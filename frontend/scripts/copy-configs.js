const fs = require('fs');
const path = require('path');

// Directorios
const srcDir = path.join(__dirname, '../src/widget');
const destDir = path.join(__dirname, '../build/static/js');

console.log('Iniciando copia de archivos de configuración...');
console.log('Directorio fuente:', srcDir);
console.log('Directorio destino:', destDir);

// Asegurarse de que el directorio de destino existe
if (!fs.existsSync(destDir)) {
  console.log('Creando directorio de destino...');
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
  
  console.log(`\nProcesando archivo: ${file}`);
  console.log('Ruta fuente:', srcPath);
  console.log('Ruta destino:', destPath);
  
  if (fs.existsSync(srcPath)) {
    try {
      fs.copyFileSync(srcPath, destPath);
      console.log(`✅ Copiado exitosamente: ${file}`);
      
      // Verificar que el archivo se copió correctamente
      if (fs.existsSync(destPath)) {
        const stats = fs.statSync(destPath);
        console.log(`Tamaño del archivo: ${stats.size} bytes`);
      } else {
        console.error(`❌ Error: El archivo no existe en el destino: ${destPath}`);
      }
    } catch (error) {
      console.error(`❌ Error al copiar ${file}:`, error);
    }
  } else {
    console.error(`❌ Archivo no encontrado: ${file}`);
  }
});

// Listar archivos en el directorio de destino
console.log('\nArchivos en el directorio de destino:');
fs.readdirSync(destDir).forEach(file => {
  const stats = fs.statSync(path.join(destDir, file));
  console.log(`- ${file} (${stats.size} bytes)`);
}); 