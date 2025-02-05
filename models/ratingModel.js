const db = require('../config/db');

class Rating {
  static async create(id_pengguna, id_buku, rating) {
    const [result] = await db.execute(
      'INSERT INTO rating (id_pengguna, id_buku, rating) VALUES (?, ?, ?)',
      [id_pengguna, id_buku, rating]
    );
    return result;
  }

  static async getByUserAndBook(id_pengguna, id_buku) {
    const [rows] = await db.execute(
      'SELECT * FROM rating WHERE id_pengguna = ? AND id_buku = ?',
      [id_pengguna, id_buku]
    );
    return rows[0];
  }

  static async updateRating(id_pengguna, id_buku, rating) {
    const [result] = await db.execute(
      'UPDATE rating SET rating = ? WHERE id_pengguna = ? AND id_buku = ?',
      [rating, id_pengguna, id_buku]
    );
    return result;
  }

  static async getRatingsByBook(id_buku) {
    const [rows] = await db.execute(
      'SELECT * FROM rating WHERE id_buku = ?',
      [id_buku]
    );
    return rows;
  }
}

module.exports = Rating;
