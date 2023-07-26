const User = require("../../models/user");
const verify = require("./verify");

const postLogin = async (req, res) => {
  try {
    console.log("login event came");
    const { mail, username, fireid, token } = req.body;

    const user = await User.findOne({ mail: mail.toLowerCase() });

    if (user) {
      if (verify(token)) {
        console.log("login now")
        return res.status(200).json({
          userDetails: {
            mail: user.mail,
            token: token,
            username: user.username,
            _id: user._id
          },
        });
      }
    }
    else {
      console.log("register now")
      const newUser = new User({
        mail: mail.toLowerCase(),
        username: username,
        fireid: fireid,
      });

      const savedUser = await newUser.save();

      if (savedUser) {
        return res.status(200).json({
          userDetails: {
            mail: savedUser.mail,
            token: token,
            username: savedUser.username,
            _id: savedUser._id
          },
        });
      }
    }

    return res.status(400).send("Invalid credentials. Please try again");
  } catch (err) {
    return res.status(500).send("Something went wrong. Please try again");
  }
};

module.exports = postLogin;
