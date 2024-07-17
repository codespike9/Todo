const jwt=require("jsonwebtoken");

generateToken = (userData) => {
    try {
      const token = jwt.sign(userData, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });
      return token;
    } catch (error) {
      console.error(error);
    }
  };

module.exports=generateToken;