const ENV = require("../../config/env.config");
var jwt = require("jsonwebtoken");
const returnResponse = require("../../constants/controller.constant");

const createToken = (data) => {
  const token = jwt.sign(
    {
      data: {email: data.email, role: data.role, name: data.name},
    },
    ENV.SECRET,
    { expiresIn: ENV.TOKEN_EXPIRED }
  );
  return token;
};

const getTokenFromHeader = (req) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  return authHeader.split(" ")[1]; // Lấy phần token sau "Bearer "
};

const isUser = (req, res, next) => {
  const token = getTokenFromHeader(req);
  if (token) {
    return returnResponse("Access token is missing", null, res, 401);
  }
  try {
    var decoded = jwt.verify(token, ENV.SECRET);
    if (decoded.role === "USER") {
      req.user = decoded;
      next();
    }
    return returnResponse("Forbidden", null, res, 403);
  } catch (error) {
    return returnResponse("Invalid or expired token", error, res, 403);
  }
};

module.exports = { createToken, isUser };
