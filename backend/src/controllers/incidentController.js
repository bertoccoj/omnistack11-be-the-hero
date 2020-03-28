const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;

    const [total] = await connection('incidents').count();

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        "incidents.*",
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ]);

    response.header('X-Total-Count', total['count(*)']);
    response.json(incidents);
  },

  async create(request, response) {

    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;
    console.log(request.headers);


    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id,
    });

    return response.json({ id });
  },

  async delete(request, response) {
    const { params: { id }, headers: { authorization: ong_id }} = request;

    if (!ong_id) {
      return response.status(401).send({ error: 'Operation not permitted' });
    }

    if (isNaN(id)) {
        return response.status(400).send({ error: 'Invalid id' });
    }

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if (!incidents || !incidents.lenght) {
        return response.status(400).send({ error: 'Não foi encontrado nenhum caso para a ong informada' });
    }

    if (!incident) {
      return response.status(400).send();
    }

    if (incident.ong_id !== ong_id) {
      return response.status(401).json({ error: 'Operation not permitted' });
    }

    await connection('incidents').where('id', id).delete();

    response.status(204).send();
  }
}
