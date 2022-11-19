const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
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

  static async signIn({ email, password }) {
    // grab user's email
    const user = await User.getUserByEmail(email);
    if (!user) throw new Error('Invalid email/password');

    // match hashed password against inputted password
    const passwordsMatch = bcrypt.compareSync(password, user.passwordHash);
    if (!passwordsMatch) throw new Error('Invalid email/password');

    const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
      expiresIn: '1 day',
    });

    return token;
  }
};
