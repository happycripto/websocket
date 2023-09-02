import path from 'path';
import __dirname from './src/utils.js';

const config = {
    mode: 'development', // o 'production' según tus necesidades
    entry: './src/public/js/index.js', // Ruta de tu archivo index.js del cliente
  output: {
    filename: 'bundle.js', // Nombre del archivo de salida
    path: path.resolve(__dirname, 'public'), // Ruta de salida
  },
};

export default config;

