const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { User } = require("../db/models/user.model");

class UserService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await User.create({
      ...data,
      password: hash
    });
    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    return await User.findAll();
  }

  async findByEmail(email) {
    return await User.findOne({
      where: {email}
    });
  }

  async findOne(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    return await user.update(changes);
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
