const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = class UserService {
  static async create({ email, password }) {
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    // console.log('passwordHash: ', passwordHash);
    const user = await User.insert({
      email,
      passwordHash,
    });
    // console.log('user: ', user);
    return user;
  }

  //   static async signIn({ email, password }) {

  //   }
};
