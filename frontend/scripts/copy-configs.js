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

// Archivos a copiar (los archivos requeridos primero)
const requiredFiles = [
    'sgarbi-config.js',
    'eltrebol-config.js'
];

const optionalFiles = [
    'nuevacliente-config.js'
];

const filesToCopy = [...requiredFiles, ...optionalFiles];

let successCount = 0;
let errorCount = 0;
let skippedCount = 0;

// Función para verificar si un archivo existe
function fileExists(filePath) {
    try {
        return fs.existsSync(filePath);
    } catch (error) {
        console.error(`Error al verificar archivo ${filePath}:`, error);
        return false;
    }
}

// Función para copiar un archivo
function copyFile(srcPath, destPath) {
    try {
        // Leer el contenido del archivo
        const content = fs.readFileSync(srcPath, 'utf8');
        
        // Escribir el contenido en el destino
        fs.writeFileSync(destPath, content, 'utf8');
        
        // Verificar que el archivo se copió correctamente
        if (fileExists(destPath)) {
            const stats = fs.statSync(destPath);
            console.log(`✅ Copiado exitosamente: ${path.basename(srcPath)} (${stats.size} bytes)`);
            return true;
        } else {
            console.error(`❌ Error: El archivo no existe en el destino: ${destPath}`);
            return false;
        }
    } catch (error) {
        console.error(`❌ Error al copiar ${path.basename(srcPath)}:`, error);
        return false;
    }
}

// Copiar cada archivo
filesToCopy.forEach(file => {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);
    const isRequired = requiredFiles.includes(file);
    
    console.log(`\nProcesando archivo: ${file}`);
    console.log('Ruta fuente:', srcPath);
    console.log('Ruta destino:', destPath);
    
    if (fileExists(srcPath)) {
        if (copyFile(srcPath, destPath)) {
            successCount++;
        } else {
            errorCount++;
        }
    } else {
        if (isRequired) {
            console.error(`❌ Error: Archivo requerido no encontrado: ${file}`);
            errorCount++;
        } else {
            console.log(`⚠️ Archivo opcional no encontrado: ${file}`);
            skippedCount++;
        }
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
console.log(`⚠️ Archivos opcionales omitidos: ${skippedCount}`);
console.log(`❌ Errores: ${errorCount}`);

// Solo salir con error si fallaron archivos requeridos
if (errorCount > 0) {
    console.error('\n❌ El build falló porque no se pudieron copiar archivos requeridos');
    process.exit(1);
} else {
    console.log('\n✅ Build completado exitosamente');
    process.exit(0);
}

const API_URL = 'https://chatbox-0r1r.onrender.com'; 