function dataSubmitted(req) {
    const datos = { ...req.query, ...req.body };
    return datos;
  }
  
  module.exports = dataSubmitted;
  