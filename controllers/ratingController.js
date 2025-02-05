const Rating = require('../models/ratingModel');
const db = require('../config/db');

const ratingController = {
  getAll: async (req, res) => {
    try {
      const [ratings] = await db.execute('SELECT * FROM rating');
      res.status(200).json(ratings);
    } catch (err) {
      res.status(500).json({ message: 'Error mendapatkan rating', error: err.message });
    }
  },

  getRatings: async (req, res) => {
    const { id_buku } = req.params;

    try {
      const ratings = await Rating.getRatingsByBook(id_buku);
      res.status(200).json(ratings);
    } catch (err) {
      res.status(500).json({ message: 'Error mendapatkan rating untuk buku', error: err.message });
    }
  },

  create: async (req, res) => {
    const { id_pengguna, id_buku, rating } = req.body;

    try {
      if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Rating harus antara 1 dan 5' });
      }
      await Rating.create(id_pengguna, id_buku, rating);
      res.status(201).json({ message: 'Rating berhasil ditambahkan' });
    } catch (err) {
      res.status(500).json({ message: 'Error memberikan rating', error: err.message });
    }
  },

  update: async (req, res) => {
    const { id_pengguna, id_buku, rating } = req.body;

    try {
      if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Rating harus antara 1 dan 5' });
      }
      await Rating.updateRating(id_pengguna, id_buku, rating);
      res.status(200).json({ message: 'Rating berhasil diperbarui' });
    } catch (err) {
      res.status(500).json({ message: 'Error memperbarui rating', error: err.message });
    }
  },

  delete: async (req, res) => {
    const { id_pengguna, id_buku } = req.params;

    try {
      await db.execute('DELETE FROM rating WHERE id_pengguna = ? AND id_buku = ?', [id_pengguna, id_buku]);
      res.status(200).json({ message: 'Rating berhasil dihapus' });
    } catch (err) {
      res.status(500).json({ message: 'Error menghapus rating', error: err.message });
    }
  }
};

module.exports = ratingController;
