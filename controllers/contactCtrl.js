const Contact = require("../models/contactModel");
const asyHandler = require("express-async-handler");
const { validateMoongodbId } = require("../utils/vaidateMongodbid");

//create PContact
const createContact = asyHandler(async (req, res) => {
  try {
    const newContact = await Contact.create(req.body);
    res.json(newContact);
  } catch (error) {
    throw new Error(error);
  }
});

//update Contact
const updateContact = asyHandler(async (req, res) => {
  const { id } = req.params;
  validateMoongodbId(id);
  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedContact);
  } catch (error) {
    throw new Error(error);
  }
});

//get a Contact

const getContact = asyHandler(async (req, res) => {
  const { id } = req.params;
  validateMoongodbId(id);
  try {
    const findContact = await Contact.findById(id);

    res.json(findContact);
  } catch (error) {
    throw new Error(error);
  }
});

//get all Contact
const getAllContact = asyHandler(async (req, res) => {
  try {
    const getAll = await Contact.find();
    res.json(getAll);
  } catch (error) {
    throw new Error(error);
  }
});

//Delete a Contact
const deleteContact = asyHandler(async (req, res) => {
  const { id } = req.params;
  validateMoongodbId(id);
  try {
    const findContact = await Contact.findByIdAndDelete(id);
    res.json({
      success: true,
      findContact,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createContact,
  updateContact,
  getContact,
  getAllContact,
  deleteContact,
};
