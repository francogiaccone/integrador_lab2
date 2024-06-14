import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import prestacionRoutes from './routes/prestacion.js';
import profesionalRoutes from './routes/profesional.js';
import pacienteRoutes from './routes/paciente.js';
import medicamentoRoutes from './routes/medicamento.js';
import prescripcionRoutes from './routes/prescripcion.js';

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

//midlewares
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

//configuracion de pug
app.set('view engine', 'pug');
app.set('views', join(__dirname, 'views'));

app.use('/prestacion', prestacionRoutes);
app.use('/profesional', profesionalRoutes);
app.use('/paciente', pacienteRoutes);
app.use('/medicamento', medicamentoRoutes);
app.use('/prescripcion', prescripcionRoutes);

app.listen(3000, () => console.log('Servidor iniciado en puerto 3000'));