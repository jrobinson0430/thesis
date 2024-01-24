const Adoption = require('../models/AdoptionModel');
const User = require('../models/userModel');

const get_all_adoptions = async (req, res) => {
  try {
    const allAdoptions = await Adoption.find({}).limit(100).sort({ status: -1, created: 1 });

    res.status(200).json({ success: !!allAdoptions.length, adoptions: allAdoptions });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while trying to access the database. Please try again later or contact us at 1-800-555-5555 for assistance.',
      href: req.headers.referer,
    });
  }
};
const get_user_adoptions = async (req, res) => {
  try {
    const userDoc = await User.findById(
      { _id: req.userId },
      { email: 1 },
    );

    const userAdoptions = await Adoption
      .find(
        { email: userDoc.email },
        {
          created: 1, status: 1, confirmationNum: 1, comments: 1, animalName: 1,
        },
      )
      .sort({ created: -1 });

    res.status(200).json({
      success: true,
      adoptions: userAdoptions,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const update_status = async (req, res) => {
  try {
    const { _id } = req.params;
    const updatedDoc = await Adoption.findOneAndReplace(
      { _id },
      { ...req.body },
      { new: true },
    );

    res.status(200).json({ success: true, updatedDoc });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const create_adoption = async (req, res) => {
  try {
    await Adoption.create({ ...req.body });
    res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while trying to process your adoption Request. Please try again later or contact us at 1-800-555-5555 for assistance.',
      href: req.headers.referer,
    });
  }
};

module.exports = {
  get_all_adoptions,
  get_user_adoptions,
  create_adoption,
  update_status,
};
