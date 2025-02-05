const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const anggotaRoutes = require('./routes/anggotaRoutes');
const bukuRoutes = require('./routes/bukuRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const genreRoutes = require('./routes/genreRoutes');
const publicRoutes = require('./routes/publicRoutes'); // Tambahkan rute publik


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(cors()); // Pastikan CORS tidak menghambat
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/anggota', anggotaRoutes);
app.use('/api/buku', bukuRoutes);
app.use('/api/rating', ratingRoutes);
app.use('/api/genre', genreRoutes);
app.use('/register', anggotaRoutes);
app.use('/api/public', publicRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
