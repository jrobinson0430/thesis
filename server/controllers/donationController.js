const Donation = require('../models/DonationModel');
const User = require('../models/userModel');

const get_all_donations = async (req, res) => {
  try {
    const allDonations = await Donation
      .find({}, { cardNum: 0, verificationNum: 0 })
      .limit(100).sort({ created: 1 });

    res.status(200).json({ success: true, donations: allDonations });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while trying to access the database. Please try again later or contact us at 1-800-555-5555 for assistance.',
      href: req.headers.referer,
    });
  }
};
const get_user_donations = async (req, res) => {
  try {
    const userDoc = await User.findById({ _id: req.userId }, { email: 1 });

    const userDonations = await Donation.find(
      { email: userDoc.email },
      { donation: 1, confirmationNum: 1, created: 1 },
    ).sort({ status: -1, created: -1 });

    res.status(200).json({
      success: true,
      donations: userDonations,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while trying to access the database. Please try again later or contact us at 1-800-555-5555 for assistance.',
      href: req.headers.referer,
    });
  }
};

const create_donation = async (req, res) => {
  try {
    await Donation.create({ ...req.body });
    res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while trying to process your donation. Please try again later or contact us at 1-800-555-5555 for assistance.',
      href: req.headers.referer,
    });
  }
};

module.exports = {
  get_all_donations,
  create_donation,
  get_user_donations,
};

// figure out why i cant access the user id of the req. look in verifyJWT and hasUserRole FNS
