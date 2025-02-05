const db = require('../config/db');

class Buku {
  static async getAll() {
    const [rows] = await db.execute('SELECT * FROM buku');
    return rows;
  }
  static async create(judul, penulis, tahun_terbit, jumalah) {
    const [result] = await db.execute(
        'INSERT INTO buku (judul, penulis, tahun_terbit, jumalah) VALUES (?, ?, ?, ?)',
        [judul, penulis, tahun_terbit, jumalah]
    );
    return result;
}


static async getById(id_buku) {
  try {
    const [buku] = await db.execute('SELECT * FROM buku WHERE id_buku = ?', [id_buku]);
    console.log('Fetched book:', buku); // Log the result
    if (!buku || buku.length === 0) {
      return null;
    }
    return buku[0];
  } catch (err) {
    console.error('Error fetching book:', err); // Log the error
    throw new Error('Error fetching book');
  }
}


  static async create(judul, penulis, tahun_terbit, jumalah) {
    const [result] = await db.execute(
      'INSERT INTO buku (judul, penulis, tahun_terbit, jumalah) VALUES (?, ?, ?, ?)',
      [judul, penulis, tahun_terbit, jumalah]
    );
    return result;
  }
  static async update(id_buku, judul, penulis, tahun_terbit, jumalah) {
    const [result] = await db.execute(
      'UPDATE buku SET judul = ?, penulis = ?, tahun_terbit = ?, jumalah = ? WHERE id_buku = ?',
      [judul, penulis, tahun_terbit, jumalah, id_buku]
    );
    return result;
  }

  static async delete(id_buku) {
    const [result] = await db.execute('DELETE FROM buku WHERE id_buku = ?', [id_buku]);
    return result;
  }
}

module.exports = Buku;
