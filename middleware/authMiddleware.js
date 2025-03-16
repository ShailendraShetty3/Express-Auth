const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access Denied. Token missing or malformed." });
  }
  
  const token = authHeader.split(" ")[1];


  try {
    // const verified = jwt.verify(token.replace("Bearer ", ""), "secret-key");
    const verified = jwt.verify(token, "secret-key");
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid Token" });
  }
};

module.exports = authMiddleware;
