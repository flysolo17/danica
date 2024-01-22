const express = require("express");
const { createUser, getUserByEmail } = require("../services/auth-service");
const router = express.Router();
const { checkPassword } = require("../security/encryption");

router.post("/register", async (req, res) => {
  const { person, name, address, phone, position, type, email, password } =
    req.body;
  try {
    user = {
      person,
      name,
      address,
      phone,
      position,
      type,
      email,
      password,
    };

    const result = await createUser(user);
    if (result) {
      res.status(201).json({
        message: "Successfully registered!",
      });
    } else {
      res.status(500).json({
        message: "Failed to register!",
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await getUserByEmail(email);
  if (result.length !== 0) {
    const user = result[0];
    const matchedPassword = await checkPassword(password, user.password);
    if (matchedPassword) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: "invalid password" });
    }
  } else {
    res.status(404).json({ message: "User not found!" });
  }
});

module.exports = router;
