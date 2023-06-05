const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postLogin = async (req, res) => {
  // console.log('Login')
  try {
    const { mail, password } = req.body;
    const user = await User.findOne({ mail: mail.toLowerCase() });
    if (user && (await bcrypt.compare(password, user.password))) {
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
      return res.status(200).json({
        userDetails: {
          mail: user.mail,
          token: token,
          name: user.name,
        },
      });
    }
  } catch (error) {
    return resizeBy.status(500).send("Something went wrong. Please try again");
  }
};

module.exports = postLogin;
