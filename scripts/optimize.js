import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const optimizeImage = async (inputPath, outputPath) => {
  try {
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);
    console.log(`Optimized ${path.basename(inputPath)} to WebP format`);
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error);
  }
};

const optimizeImages = async () => {
  const resourcesDir = path.join(__dirname, '../src/resources');
  const files = fs.readdirSync(resourcesDir);

  for (const file of files) {
    if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      const inputPath = path.join(resourcesDir, file);
      const outputPath = path.join(
        resourcesDir,
        `${path.parse(file).name}.webp`
      );
      await optimizeImage(inputPath, outputPath);
    }
  }
};

optimizeImages(); 