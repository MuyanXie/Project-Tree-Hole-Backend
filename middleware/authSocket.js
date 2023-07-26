const jwt = require("jsonwebtoken");
const verify = require("../controllers/auth/verify");

const config = process.env;

const verifyTokenSocket = (socket, next) => {
  const token = socket.handshake.auth?.token;

  try {
    // const decoded = jwt.verify(token, config.TOKEN_KEY);
    const decoded = verify(token);
    socket.user = JSON.parse(socket.handshake.auth.user);
  } catch (err) {
    const socketError = new Error("NOT_AUTHORIZED");
    return next(socketError);
  }

  next();
};

module.exports = verifyTokenSocket;
