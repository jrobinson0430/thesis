const fs = require('fs');
const formidable = require('formidable');
const Animal = require('../models/AnimalModel');

const get_animals = async (req, res) => {

  try {
    const allAnimals = await Animal.find().sort({ name: 1 });

    res.status(200).json({ success: true, data: allAnimals });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const add_new_animal = async (req, res) => {
  try {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, data, files) => {
      const itemData = { ...data };
      if (err) {
        console.error('ERROR in create_menu_item PARSE: ', err);
      }

      if (files.photo) {
        itemData.photo = { data: '', contentType: '' };
        const imagePath = await fs.readFileSync(files.photo.filepath);
        itemData.photo.data = imagePath.toString('base64');
        itemData.photo.contentType = files.photo.mimetype;
      }

      const createdAnimal = await Animal.create({ ...itemData });
      res.status(200).json({ success: true, createdAnimal });
    }); // end of parse
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred. Please try again later or contact us at 1-800-555-5555 for assistance.',
      href: req.headers.referer,
    });
  }
};

const delete_animal = async (req, res) => {
  try {
    const { _id } = req.params;
    const deletedAnimal = await Animal.findByIdAndDelete(
      { _id },
      { new: true },
    );

    res.status(200).json({
      success: !!deletedAnimal._id,
      message: 'Animal was not deleted. Please reload and try again',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred. Please try again later or contact us at 1-800-555-5555 for assistance.',
      href: req.headers.referer,
    });
  }
};

const update_animal = async (req, res) => {
  try {
    const { _id } = req.params;
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, data, files) => {
      const itemData = { ...data };
      if (err) {
        console.error('ERROR in create_menu_item PARSE: ', err);
      }

      if (files.photo) {
        itemData.photo = { data: '', contentType: '' };
        const imagePath = await fs.readFileSync(files.photo.filepath);
        itemData.photo.data = imagePath.toString('base64');
        itemData.photo.contentType = files.photo.mimetype;
      }

      const updatedAnimal = await Animal
        .findByIdAndUpdate({ _id }, { ...itemData }, { new: true });

      res.status(200).json({ success: true, updatedAnimal });
    }); // end of parse
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred. Please try again later or contact us at 1-800-555-5555 for assistance.',
      href: req.headers.referer,
    });
  }
};

module.exports = {
  get_animals,
  add_new_animal,
  delete_animal,
  update_animal,
};
