const db = require('../config/db');

class Anggota {
  static async getAll() {
    const [rows] = await db.execute('SELECT * FROM anggota');
    return rows;
  }

  static async getById(id) {
    try {
      const [rows] = await db.execute('SELECT * FROM anggota WHERE id = ?', [id]);
      return rows;
    } catch (err) {
      throw new Error('Failed to fetch anggota');
    }
  }
  static async findByEmail(email) {
    const [rows] = await db.execute("SELECT * FROM anggota WHERE email = ?", [email]);
    return rows[0]; // Harus mengembalikan satu user atau undefined
}


static async create(nama, email, kata_sandi) {
  if (!nama || !email || !kata_sandi) {
    throw new Error('Invalid input: nama, email, dan kata_sandi harus diisi');
  }

  const query = 'INSERT INTO anggota (nama, email, kata_sandi) VALUES (?, ?, ?)';
  const [result] = await db.execute(query, [nama, email, kata_sandi]);

  return { id: result.insertId, nama, email }; 
}

  static async update(id, nama, email) {
    const [result] = await db.execute(
      'UPDATE anggota SET nama = ?, email = ? WHERE id = ?',
      [nama, email, id]
    );
    return result;
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM anggota WHERE id = ?', [id]);
    return result;
  }
}

module.exports = Anggota;
