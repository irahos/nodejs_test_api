import { user } from '../models/user.js';

function findByEmail(email) {
  return user.findOne({ where: { email } });
}

function findById(id) {
  return user.findByPk(id);
}

function normalize({ id, email, first_name, last_name }) {
  return { id, email, first_name, last_name };
}

export const userService = {
  findByEmail,
  findById,
  normalize
}