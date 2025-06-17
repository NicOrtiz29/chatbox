const fs = require('fs');
const path = require('path');

// Directorios
const srcDir = path.join(__dirname, '../src/widget');
const destDir = path.join(__dirname, '../build/static/js');

console.log('Iniciando copia de archivos de configuración...');
console.log('Directorio fuente:', srcDir);
console.log('Directorio destino:', destDir);

// Verificar que el directorio fuente existe
if (!fs.existsSync(srcDir)) {
  console.error('❌ Error: El directorio fuente no existe:', srcDir);
  process.exit(1);
}

// Asegurarse de que el directorio de destino existe
if (!fs.existsSync(destDir)) {
  console.log('Creando directorio de destino...');
  try {
    fs.mkdirSync(destDir, { recursive: true });
    console.log('✅ Directorio de destino creado exitosamente');
  } catch (error) {
    console.error('❌ Error al crear el directorio de destino:', error);
    process.exit(1);
  }
}

// Archivos a copiar
const filesToCopy = [
  'sgarbi-config.js',
  'eltrebol-config.js',
  'nuevacliente-config.js'
];

let successCount = 0;
let errorCount = 0;

// Copiar cada archivo
filesToCopy.forEach(file => {
  const srcPath = path.join(srcDir, file);
  const destPath = path.join(destDir, file);
  
  console.log(`\nProcesando archivo: ${file}`);
  console.log('Ruta fuente:', srcPath);
  console.log('Ruta destino:', destPath);
  
  if (fs.existsSync(srcPath)) {
    try {
      // Leer el contenido del archivo
      const content = fs.readFileSync(srcPath, 'utf8');
      
      // Escribir el contenido en el destino
      fs.writeFileSync(destPath, content, 'utf8');
      
      // Verificar que el archivo se copió correctamente
      if (fs.existsSync(destPath)) {
        const stats = fs.statSync(destPath);
        console.log(`✅ Copiado exitosamente: ${file} (${stats.size} bytes)`);
        successCount++;
      } else {
        console.error(`❌ Error: El archivo no existe en el destino: ${destPath}`);
        errorCount++;
      }
    } catch (error) {
      console.error(`❌ Error al copiar ${file}:`, error);
      errorCount++;
    }
  } else {
    console.error(`❌ Archivo no encontrado: ${file}`);
    errorCount++;
  }
});

// Listar archivos en el directorio de destino
console.log('\nArchivos en el directorio de destino:');
try {
  const files = fs.readdirSync(destDir);
  if (files.length === 0) {
    console.log('⚠️ El directorio de destino está vacío');
  } else {
    files.forEach(file => {
      const stats = fs.statSync(path.join(destDir, file));
      console.log(`- ${file} (${stats.size} bytes)`);
    });
  }
} catch (error) {
  console.error('❌ Error al listar archivos en el directorio de destino:', error);
}

// Resumen final
console.log('\nResumen de la operación:');
console.log(`✅ Archivos copiados exitosamente: ${successCount}`);
console.log(`❌ Errores: ${errorCount}`);

// Salir con código de error si hubo problemas
if (errorCount > 0) {
  process.exit(1);
} 