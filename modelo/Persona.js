const pool = require('./DataBase');

class Persona {
    constructor(nroDni = null, apellido = null, nombre = null, fechaNac = null, telefono = null, domicilio = null) {
        this.nroDni = nroDni;
        this.apellido = apellido;
        this.nombre = nombre;
        this.fechaNac = fechaNac;
        this.telefono = telefono;
        this.domicilio = domicilio;
    }

    // Método para insertar una persona
    async insertar() {
        const sql = 'INSERT INTO persona (NroDni, Apellido, Nombre, fechaNac, Telefono, Domicilio) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await pool.execute(sql, [this.nroDni, this.apellido, this.nombre, this.fechaNac, this.telefono, this.domicilio]);
        return result;
    }

    // Método para modificar una persona
    async modificar() {
        const sql = 'UPDATE persona SET Apellido = ?, Nombre = ?, fechaNac = ?, Telefono = ?, Domicilio = ? WHERE NroDni = ?';
        const [result] = await pool.execute(sql, [this.apellido, this.nombre, this.fechaNac, this.telefono, this.domicilio, this.nroDni]);
        return result;
    }

    // Método para eliminar una persona
    async eliminar() {
        const sql = 'DELETE FROM persona WHERE NroDni = ?';
        const [result] = await pool.execute(sql, [this.nroDni]);
        return result;
    }

    // Método para listar personas
    static async listar(where = '') {
        let sql = 'SELECT * FROM persona';
        if (where) {
            sql += ` WHERE ${where}`;
        }
        const [rows] = await pool.execute(sql);
        return rows.map(row => new Persona(row.NroDni, row.Apellido, row.Nombre, row.fechaNac, row.Telefono, row.Domicilio));
    }
}

module.exports = Persona;
