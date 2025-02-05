const axios = require('axios');

const publicController = {
  // Mencari buku berdasarkan judul
  searchBook: async (req, res) => {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ message: 'Title parameter is required' });
    }

    try {
      const response = await axios.get(`https://openlibrary.org/search.json`, {
        params: { title },
      });

      if (response.data.docs.length === 0) {
        return res.status(404).json({ message: 'No books found' });
      }

      const books = response.data.docs.map((doc) => ({
        title: doc.title,
        author_name: doc.author_name,
        first_publish_year: doc.first_publish_year,
        cover_url: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg` : null,
        olid: doc.key.replace('/works/', ''),
      }));

      res.json(books);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching data from Open Library', error: err.message });
    }
  }

};

module.exports = publicController;
