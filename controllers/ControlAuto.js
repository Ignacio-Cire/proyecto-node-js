const { Auto } = require('../models');

// Clase ControlAuto
class ControlAuto {
  // Método para agregar un nuevo auto
  async agregarAuto(datosAuto) {
    try {
      const { Patente, Marca, Modelo, DniDuenio } = datosAuto;
      const auto = await Auto.create({ Patente, Marca, Modelo, DniDuenio });
      return { success: true, message: "Auto agregado correctamente.", auto };
    } catch (error) {
      return { success: false, message: "Error al agregar el auto.", error };
    }
  }

  // Método para modificar un auto existente
  async modificarAuto(datosAuto) {
    try {
      const { Patente, Marca, Modelo, DniDuenio } = datosAuto;
      const [updated] = await Auto.update({ Marca, Modelo, DniDuenio }, {
        where: { Patente }
      });
      if (updated) {
        const updatedAuto = await Auto.findOne({ where: { Patente } });
        return { success: true, message: "Auto modificado correctamente.", updatedAuto };
      } else {
        return { success: false, message: "Auto no encontrado." };
      }
    } catch (error) {
      return { success: false, message: "Error al modificar el auto.", error };
    }
  }

  // Método para eliminar un auto
  async eliminarAuto(patente) {
    try {
      const deleted = await Auto.destroy({ where: { Patente: patente } });
      if (deleted) {
        return { success: true, message: "Auto eliminado correctamente." };
      } else {
        return { success: false, message: "Auto no encontrado." };
      }
    } catch (error) {
      return { success: false, message: "Error al eliminar el auto.", error };
    }
  }

  // Método para buscar un auto por patente
  async buscarAutoPorPatente(patente) {
    try {
      const auto = await Auto.findOne({ where: { Patente: patente } });
      if (auto) {
        return { success: true, auto };
      } else {
        return { success: false, message: "Auto no encontrado." };
      }
    } catch (error) {
      return { success: false, message: "Error al buscar el auto.", error };
    }
  }

  // Método para listar autos
  async listar(where = "") {
    try {
      const autos = await Auto.findAll({ where: where ? { where } : {} });
      return { success: true, autos };
    } catch (error) {
      return { success: false, message: "Error al listar autos.", error };
    }
  }
}

module.exports = ControlAuto;
