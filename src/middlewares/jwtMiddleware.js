const jwt = require("jsonwebtoken");

class Jwt {
  verifyAccessToken = (req, res, next) => {

    let token = req.cookies.accessToken;
    if (!token) return res.status(400).json({ error: "Token non found" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ error: "Invalid token" });
    }
  };

}

module.exports=new Jwt();