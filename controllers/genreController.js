const Genre = require('../models/genreModel');
const db = require('../config/db');

const genreController = {
  getAll: async (req, res) => {
    try {
      const [genres] = await db.execute('SELECT * FROM genre');
      res.status(200).json(genres);
    } catch (err) {
      res.status(500).json({ message: 'Error mendapatkan genre', error: err.message });
    }
  },

  getById: async (req, res) => {
    const { id_genre } = req.params;

    try {
      const [genre] = await db.execute('SELECT * FROM genre WHERE id_genre = ?', [id_genre]);
      if (genre.length === 0) {
        return res.status(404).json({ message: 'Genre tidak ditemukan' });
      }
      res.status(200).json(genre[0]);
    } catch (err) {
      res.status(500).json({ message: 'Error mendapatkan genre', error: err.message });
    }
  },

  create: async (req, res) => {
    const { id_genre, nama_genre } = req.body;

    try {
      await Genre.create(id_genre, nama_genre);
      res.status(201).json({ message: 'Genre berhasil ditambahkan' });
    } catch (err) {
      res.status(500).json({ message: 'Error menambahkan genre', error: err.message });
    }
  },

  update: async (req, res) => {
    const { id_genre } = req.params;
    const { nama_genre } = req.body;

    try {
      await db.execute('UPDATE genre SET nama_genre = ? WHERE id_genre = ?', [nama_genre, id_genre]);
      res.status(200).json({ message: 'Genre berhasil diperbarui' });
    } catch (err) {
      res.status(500).json({ message: 'Error memperbarui genre', error: err.message });
    }
  },

  delete: async (req, res) => {
    const { id_genre } = req.params;

    try {
      await db.execute('DELETE FROM genre WHERE id_genre = ?', [id_genre]);
      res.status(200).json({ message: 'Genre berhasil dihapus' });
    } catch (err) {
      res.status(500).json({ message: 'Error menghapus genre', error: err.message });
    }
  }
};

module.exports = genreController;
