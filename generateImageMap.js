const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'ijanda/assets/images');
const outputFile = path.join(__dirname, 'ijanda/assets/imageMap.js');

const validExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];

const files = fs.readdirSync(imagesDir).filter(file =>
    validExtensions.includes(path.extname(file).toLowerCase())
);

const lines = [];
lines.push('// Archivo generado automáticamente por generateImageMap.js');
lines.push('');
lines.push('const images = {');

files.forEach(file => {
    const key = path.basename(file, path.extname(file)).replace(/\s+/g, '_');
    const relativePath = `./images/${file}`;
    lines.push(`  "${key}": require('${relativePath}'),`);
});

lines.push('};');
lines.push('');
lines.push('export default images;');
lines.push('');

fs.writeFileSync(outputFile, lines.join('\n'), 'utf8');

console.log(`Mapa generado con ${files.length} imágenes en ${outputFile}`);
