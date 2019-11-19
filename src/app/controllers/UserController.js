import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({
        error: 'Validation fails',
      });

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
  } // store()

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
      provider: Yup.bool(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({
        error: 'Validation fails',
      });

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      if (await UserController.emailExists(email))
        return res.status(400).json({
          error: 'User already exists',
        });
    }

    if (oldPassword && !(await user.checkPassword(oldPassword)))
      return res.status(401).json({
        message: 'Password does not match',
      });

    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  } // update()

  static emailExists(email) {
    return User.findOne({
      where: {
        email,
      },
    });
  } // emailExists()
}

export default new UserController();
