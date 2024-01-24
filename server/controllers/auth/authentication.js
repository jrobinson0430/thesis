const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');

const JWT_secret = 'shhhDontTellAnyone';

const createJWT = async (id) => {
  try {
    const token = await jwt.sign(
      { id },
      JWT_secret,
      {
        expiresIn: 86400,
      },
    );
    return token;
  } catch (error) {
    return console.error(error);
  }
};

const verifyJWT = async (req, res, next) => {
  try {
    const { cookie } = req.headers;
    if (!cookie) {
      return res.status(200).json({
        success: false,
        message: 'You do not have the authorization level to access this page',
        href: req.headers.referer,
      });
    }
    const token = cookie.split('=')[1];
    await jwt.verify(token, JWT_secret, (err, user) => {
      if (err) { return res.sendStatus(403); }
      req.userId = user.id;
      next();
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'You do not have the authorization level to access this page',
      href: req.headers.referer,
    });
  }
};

// step 1 of login: verify the password using bcrypt
const verify_password = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(200).json({
        success: false,
        message: 'Email does not exist. Please try again.',
      });
    }

    // run password through bcrypt
    const isValidPassword = await existingUser.comparePassword(password);
    if (isValidPassword) {
      req.user = existingUser;
      next();
    } else {
      return res.status(200).json({
        success: false,
        message: 'Invalid Password. Please try again.',
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// step 2 of login: create the token and set it in the browser
const set_user_token_cookie = async (req, res, next) => {
  try {
    const token = await createJWT(req.user._id);
    await res.cookie('userToken', token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: true,
    });
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// step 3 of login: send the response back to the client (user controller).

module.exports = {
  verify_password,
  set_user_token_cookie,
  verifyJWT,
};
