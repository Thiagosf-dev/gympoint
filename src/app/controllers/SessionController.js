import jwt from 'jsonwebtoken';
import CONFIG from '../../../globalConfig';

import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user)
      return res.status(401).json({
        message: 'User not found',
      });

    if (!(await user.checkPassword(password)))
      return res.status(401).json({
        message: 'Password does not match',
      });

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign(
        {
          id,
        },
        CONFIG.MD5_HASH,
        {
          expiresIn: CONFIG.EXPIRES_IN,
        }
      ),
    });
  }
}

export default new SessionController();
