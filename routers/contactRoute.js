const express = require("express");
const {
  createContact,
  updateContact,
  getContact,
  getAllContact,
  deleteContact,
} = require("../controllers/contactCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddlewares");
const router = express.Router();

router.post("/", createContact);
router.put("/:id", authMiddleware, isAdmin, updateContact);
router.delete("/:id", authMiddleware, isAdmin, deleteContact);
router.get("/:id", getContact);
router.get("/", getAllContact);

module.exports = router;
