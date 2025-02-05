const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Anggota = require('../models/anggotaModel');

dotenv.config();

const authController = {
  register: async (req, res) => {
    const { nama, email, kata_sandi } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(kata_sandi, 10);
      await Anggota.create(nama, email, hashedPassword);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error registering user', error: err });
    }
  },

  login: async (req, res) => {
    const { email, kata_sandi } = req.body;

    try {
      const user = await Anggota.findByEmail(email);
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      const isMatch = await bcrypt.compare(kata_sandi, user.kata_sandi);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: 'Error logging in', error: err });
    }
  }
};

module.exports = authController;