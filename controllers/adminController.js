const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

/**
 * @description Admin Registration
 * @route POST /api/v1/admin/registration
 * @access Public
 */

const adminRegistration = asyncHandler(async (req, res) => {
  const { name, email, password, userTypeId, userTypeName } = req.body;

  const condCheck =
    !name || !email || !password || !userTypeId || !userTypeName;

  if (condCheck) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    const admin = await Admin.create({
      name,
      email,
      userTypeId,
      userTypeName,
      password: hashedPassword,
    });
    res.status(201).json({
      date: {
        name,
        email,
        userTypeId,
        userTypeName,
      },
      message: "Admin registered successfully done",
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

/**
 * @description Admin Login API
 * @route POST /api/v1/admin/login
 * @access Public
 */
const adminLogin = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const user = await Admin.findOne({ email: userName });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    res.status(401);
    throw new Error("Password doesn't");
  }

  if (user && isPasswordMatched) {
    const token = jwt.sign(
      {
        user: {
          name: user.name,
          email: user.email,
          userTypeId: user.userTypeId,
          userTypeName: user.userTypeName,
        },
      },
      process.env.JWT_PRIVATE_KEY,
      {
        expiresIn: "2m",
      }
    );
    res.status(200).json({
      data: {
        token,
        name: user.name,
        email: user.email,
        userTypeId: user.userTypeId,
        userTypeName: user.userTypeName,
      },
      message: "User login successfully",
    });
  } else {
    res.status(401);
    throw new Error("Username and password is not valid");
  }
});

/**
 * @description Get Admin Details
 * @route GET /api/v1/admin/details
 * @access Private
 */
const getAdminDetails = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json({ data: req.user, message: "Admin details fetch successfully!" });
});
module.exports = { adminRegistration, adminLogin, getAdminDetails };
