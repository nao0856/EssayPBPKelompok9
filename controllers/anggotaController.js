const Anggota = require('../models/anggotaModel');
const db = require('../config/db');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const anggotaController = {
  register: async (req, res) => {
    const { nama, email, kata_sandi } = req.body;

    // 🔍 Debug: Cek apakah data masuk ke server
    console.log("Request body:", req.body);

    // Cek apakah ada data kosong
    if (!nama || !email || !kata_sandi) {
        return res.status(400).json({ message: 'Invalid input: nama, email, dan kata_sandi harus diisi' });
    }

    try {
        const hashedPassword = await bcrypt.hash(kata_sandi, 10);

        console.log(`Registering user: ${nama}, ${email}, ${hashedPassword}`);

        const user = await Anggota.create(nama, email, hashedPassword);

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (err) {
        console.error("Error registering user:", err); 
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
},  

  login: async (req, res) => {
    const { email, kata_sandi } = req.body;
    
    if (!email || !kata_sandi) {
        return res.status(400).json({ message: "Email dan kata sandi harus diisi" });
    }

    try {
        console.log("Login attempt:", email); 

        const user = await Anggota.findByEmail(email);
        if (!user) {
            console.log("User not found"); 
            return res.status(400).json({ message: "User tidak ditemukan" });
        }

        console.log("User found:", user); 

        // Periksa apakah kata sandi cocok
        const isMatch = await bcrypt.compare(kata_sandi, user.kata_sandi);
        if (!isMatch) {
            console.log("Invalid password"); 
            return res.status(400).json({ message: "Kata sandi salah" });
        }

        // Buat token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        console.log("Login successful, token generated"); 
        res.json({ message: "Login berhasil", token });

    } catch (err) {
        console.error("Error logging in:", err); 
        res.status(500).json({ message: "Terjadi kesalahan saat login", error: err.message });
    }
},

  getAll: async (req, res) => { 
    try {
      const anggota = await Anggota.getAll();
      res.json(anggota);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching anggota', error: err });
    }
  },

  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const [anggota] = await db.execute('SELECT * FROM anggota WHERE id = ?', [id]);
      if (!anggota || anggota.length === 0) {
        return res.status(404).json({ message: 'Anggota not found' });
      }
      res.json(anggota);
    } catch (err) {
      console.error('Error fetching anggota:', err);  // Log full error
      res.status(500).json({ message: 'Error fetching anggota', error: err.message });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { nama, email } = req.body;
    try {
      const result = await Anggota.update(id, nama, email);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Anggota not found' });
      }
      res.json({ message: 'Anggota updated successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error updating anggota', error: err });
    }
  },

  delete: async (req, res) => { // 🔥 Pastikan fungsi ini ada!
    const { id } = req.params;
    try {
      const result = await Anggota.delete(id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Anggota not found' });
      }
      res.json({ message: 'Anggota deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting anggota', error: err });
    }
  }
};

module.exports = anggotaController;
