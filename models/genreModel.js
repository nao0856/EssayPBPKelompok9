const db = require('../config/db');

class Genre {
  static async getAll() {
    const [rows] = await db.execute('SELECT * FROM genre');
    return rows;
  }

  static async create(id_genre, nama_genre) {
    const [result] = await db.execute(
      'INSERT INTO genre (id_genre, nama_genre) VALUES (?, ?)',
      [id_genre, nama_genre]
    );
    return result;
  }
}

module.exports = Genre;
