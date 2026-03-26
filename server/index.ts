import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getDb } from './db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

// Basic health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', platform: 'Varsity EdTech' });
});


app.listen(PORT, async () => {
    // Ensure DB is initialized
    await getDb();
    console.log(`Varsity Server running on http://localhost:${PORT}`);
});
