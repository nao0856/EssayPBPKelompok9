const Buku = require('../models/bukuModel');

const bukuController = {
  getAll: async (req, res) => {
    try {
      const books = await Buku.getAll();
      res.json(books);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching books', error: err });
    }
  },

  getById: async (req, res) => {
    const { id_buku } = req.params;
    try {
      const book = await Buku.getById(id_buku);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json(book);
    } catch (err) {
      console.error('Error fetching book:', err);  // Log the error for better debugging
      res.status(500).json({ message: 'Error fetching book', error: err.message });
    }
  },

  create: async (req, res) => {
    const { judul, penulis, tahun_terbit, jumalah } = req.body;
    try {
      await Buku.create(judul, penulis, tahun_terbit, jumalah);
      res.status(201).json({ message: 'Book created successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error creating book', error: err });
    }
  },
  

  delete: async (req, res) => {
    const { id_buku } = req.params;
    try {
      await Buku.delete(id_buku);
      res.json({ message: 'Book deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting book', error: err });
    }
  }
};

module.exports = bukuController;
