const jwt = require("jsonwebtoken");

const validateTokenHandler = (req, res, next) => {
  let token;
  const authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decode) => {
      if (err) {
        res.status(401);
        throw new Error("Auth token is either expired/invalide");
      }
      req.user = decode.user;
      next();
    });
  }

  if (!token) {
    res.status(401);
    throw new Error("Auth token is missing");
  }
};

module.exports = validateTokenHandler;
