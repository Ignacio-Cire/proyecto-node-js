const pool = require('./DataBase');

class Auto {
    constructor(patente = null, marca = null, modelo = null, dniDuenio = null) {
        this.patente = patente;
        this.marca = marca;
        this.modelo = modelo;
        this.dniDuenio = dniDuenio;
    }

    // Método para insertar un auto
    async insertar() {
        const sql = 'INSERT INTO auto (Patente, Marca, Modelo, DniDuenio) VALUES (?, ?, ?, ?)';
        const [result] = await pool.execute(sql, [this.patente, this.marca, this.modelo, this.dniDuenio]);
        return result;
    }

    // Método para modificar un auto
    async modificar() {
        const sql = 'UPDATE auto SET Marca = ?, Modelo = ?, DniDuenio = ? WHERE Patente = ?';
        const [result] = await pool.execute(sql, [this.marca, this.modelo, this.dniDuenio, this.patente]);
        return result;
    }

    // Método para eliminar un auto
    async eliminar() {
        const sql = 'DELETE FROM auto WHERE Patente = ?';
        const [result] = await pool.execute(sql, [this.patente]);
        return result;
    }

    // Método para listar todos los autos
    static async listar(where = '') {
        let sql = 'SELECT * FROM auto';
        if (where) {
            sql += ` WHERE ${where}`;
        }
        const [rows] = await pool.execute(sql);
        return rows.map(row => new Auto(row.Patente, row.Marca, row.Modelo, row.DniDuenio));
    }
}

module.exports = Auto;
