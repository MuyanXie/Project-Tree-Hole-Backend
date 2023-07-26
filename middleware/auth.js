const jwt = require("jsonwebtoken");
const verify = require("../controllers/auth/verify");

// const config = process.env;

const verifyToken = async(req, res, next) => {
  let token = req.body.token || req.query.token || req.headers["authorization"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = await verify(token);
    req.token = decoded; // --> the wrong token is used here
    // console.log(req.headers["user"]);
    // console.log(JSON.parse(req.headers["user"]));
    req.user = JSON.parse(req.headers["user"]);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

  return next();
};


module.exports = verifyToken;
