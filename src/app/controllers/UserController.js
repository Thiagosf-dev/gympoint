import User from '../models/User';

class UserController {
  async store(req, res) {
    if (await UserController.emailExists(req.body.email))
      return res.status(400).json({
        error: 'User already exists',
      });

    const user = await User.create(req.body);
    const { id, name, email, provider } = user;

    // return res.json(user);
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  static emailExists(email) {
    return User.findOne({
      where: {
        email,
      },
    });
  }
}

export default new UserController();
