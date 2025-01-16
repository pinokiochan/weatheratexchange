import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import weatherRoutes from './routes/weatherRoutes.js';
import {fileURLToPath} from 'url';

dotenv.config();

const app =express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static('public'));
app.use('/', weatherRoutes);
app.get('/', (req, res) => {
    res.sendFile(path,join(__dirname, 'public', 'index.html'));
});
app.listen(port, ()=> {
    console.log(`Server running on port http://localhost:${port}`);  
})