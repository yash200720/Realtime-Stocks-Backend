const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postRegister = async (req, res) => {
  try {
    const { name, mail, password } = req.body;
    const userExists = await User.findOne({ mail: mail.toLowerCase() });
    if (userExists) {
      return res.status(409).send("E-mail already exists");
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      mail: mail.toLowerCase(),
      password: encryptedPassword,
    });
    // create JWT token
    const token = jwt.sign(
        {
          userId: user._id,
          mail,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "24h",
        }
      );
    res.status(201).json({
      userDetails: {
        mail: user.mail,
        token: token,
        name: user.name,
      },
    });
  } catch (error) {
    return resizeBy.status(500).send("Something went wrong. Please try again");
  }
};

module.exports = postRegister;
