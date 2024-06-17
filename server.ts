import express from 'express';
import path from 'path';
require('dotenv').config(path.resolve(__dirname, '../.env'));
import { env } from 'process';
import auth from './routes/auth';
import zayavki from './routes/zayavki';
import bookings from './routes/bookings';
import { createTables } from './db/db';
import cors from 'cors';

createTables();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = env.PORT || 8000;

app.use('/api/auth', auth);
app.use('/api/zayavki', zayavki);
app.use('/api/bookings', bookings);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});