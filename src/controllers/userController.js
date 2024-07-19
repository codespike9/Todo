const User = require("../models/UserModels");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        status: 400,
        error: "Bad Request",
        message: "All fields are required.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: 409,
        error: "Conflict",
        message: "User already exists.",
      });
    }

    let new_user = new User({
      name,
      email,
      password,
    });

    new_user = await new_user.save();

    const payload = {
      id: new_user.id,
    };
    const accessToken = generateToken(payload);

    if (new_user && accessToken) {
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });

      return res.status(201).json({
        message: "Registration successfull",
        user: {
          username: new_user.name,
          email: new_user.email,
        },
      });
    } else {
      return res.status(400).json({ message: "Some error occurred!" });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 400,
        error: "Bad Request",
        message: "All fields are required.",
      });
    }

    const userData = await User.findOne({
      email,
    });

    if (!userData || !(await userData.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const payload = {
      id: userData.id,
    };

    const access_token = generateToken(payload);
    if (userData && access_token) {
      res.cookie("access_token", access_token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });
    }
    return res.status(201).json({
      message: "Login Successfull.",
      user: {
        username: userData.name,
        email: userData.email,
      },
      message: "Login successful!!",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { registerUser, loginUser };
