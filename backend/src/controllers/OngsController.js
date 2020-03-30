const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
  async create (request, response) {
    const { name, email, whatsapp, city, uf } = request.body;
    const id = generateUniqueId();
    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    response.json({ id });
  },

  async index (_request, response) {
    const ongList = await connection('ongs').select("*");
    response.json(ongList);
  }
}
