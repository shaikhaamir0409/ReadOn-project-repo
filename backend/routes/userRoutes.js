// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  getUsers,
  loginRoute,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.get("/users", getUsers);
router.post("/login", loginRoute);
router.post("/register", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
