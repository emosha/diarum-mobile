import jwt from 'jsonwebtoken';

export const userOne = {
  id: '1',
  name: 'Olisa',
  username: 'olisa',
  email: 'olisa@emodi.com',
};

export const users = {
  userOne,
};

export const tokens = {
  userOne: jwt.sign({ userId: userOne.id }, process.env.JWT_SECRET, { expiresIn: '1 hours' }),
};

export default {
  users,
  tokens,
};
