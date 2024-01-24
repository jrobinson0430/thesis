const User = require('../../models/userModel');
const Role = require('../../models/rolesModel');

const has_user_role = async (req, res, next) => {
  try {
    const { _id: roleId } = await Role.findOne({ name: 'user' });

    const { roles } = await User.findOne({ _id: req.userId }, { roles: 1 });
    const hasAccess = roles.includes(roleId);
    if (req.body.navCheck) {
      return res.status(200).json({ showNav: hasAccess });
    }

    if (req.body.isPageCheck) {
      return hasAccess
        ? res.status(200).json({ success: hasAccess })
        : res.status(401).json({
          message: 'You do not have the authorization level to access this page',
        });
    }

    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'You do not have the authorization level to access this page',
      href: req.headers.referer,
    });
  }
};

const has_manager_role = async (req, res, next) => {
  try {
    const { _id: roleId } = await Role.findOne({ name: 'store_manager' });
    const { roles } = await User.findOne({ _id: req.userId }, { roles: 1 });
    const hasAccess = roles.includes(roleId);

    if (req.body.navCheck) {
      return res.status(200).json({ showNav: hasAccess });
    }

    if (req.body.isPageCheck) {
      return hasAccess
        ? res.status(200).json({ success: hasAccess })
        : res.status(401).json({
          message: 'You do not have the authorization level to access this page',
        });
    }
    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'You do not have the authorization level to access this page',
      href: req.headers.referer,
    });
  }
};

module.exports = {
  has_user_role,
  has_manager_role,
};
