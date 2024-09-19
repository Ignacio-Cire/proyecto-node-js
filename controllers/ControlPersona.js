const { Persona } = require('../models');

// Clase ControlPersona
class ControlPersona {
  // Método para agregar una nueva persona
  async agregarPersona(datosPersona) {
    try {
      const { NroDni, Apellido, Nombre, fechaNac, Telefono, Domicilio } = datosPersona;
      const persona = await Persona.create({ NroDni, Apellido, Nombre, fechaNac, Telefono, Domicilio });
      return { success: true, message: "Persona agregada correctamente.", persona };
    } catch (error) {
      return { success: false, message: "Error al agregar la persona.", error };
    }
  }

  // Método para modificar una persona existente
  async modificarPersona(datosPersona) {
    try {
      const { NroDni, Apellido, Nombre, fechaNac, Telefono, Domicilio } = datosPersona;
      const [updated] = await Persona.update({ Apellido, Nombre, fechaNac, Telefono, Domicilio }, {
        where: { NroDni }
      });
      if (updated) {
        const updatedPersona = await Persona.findOne({ where: { NroDni } });
        return { success: true, message: "Persona modificada correctamente.", updatedPersona };
      } else {
        return { success: false, message: "Persona no encontrada." };
      }
    } catch (error) {
      return { success: false, message: "Error al modificar la persona.", error };
    }
  }

  // Método para eliminar una persona
  async eliminarPersona(dni) {
    try {
      const deleted = await Persona.destroy({ where: { NroDni: dni } });
      if (deleted) {
        return { success: true, message: "Persona eliminada correctamente." };
      } else {
        return { success: false, message: "Persona no encontrada." };
      }
    } catch (error) {
      return { success: false, message: "Error al eliminar la persona.", error };
    }
  }

  // Método para buscar personas
  async buscarPersonas(criteriosBusqueda) {
    try {
      const personas = await Persona.findAll({ where: criteriosBusqueda });
      return { success: true, personas };
    } catch (error) {
      return { success: false, message: "Error al buscar personas.", error };
    }
  }
}

module.exports = ControlPersona;
