const knex = require('knex');
const config = require('../../knexfile');

const isTest = process.env.NODE_ENV === 'test';

const connection = knex(isTest ? config.test : config.development);

module.exports = connection;
