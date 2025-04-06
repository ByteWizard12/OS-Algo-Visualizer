import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const optimizeVideo = () => {
  const inputPath = path.join(__dirname, '../src/resources/16381072-hd_1920_1080_25fps.mp4');
  const outputPath = path.join(__dirname, '../src/resources/background-optimized.mp4');

  const command = `ffmpeg -i "${inputPath}" -vf scale=1280:720 -c:v libx264 -crf 28 -preset medium -c:a aac -b:a 128k "${outputPath}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error optimizing video: ${error}`);
      return;
    }
    console.log('Video optimization completed successfully');
  });
};

optimizeVideo(); 