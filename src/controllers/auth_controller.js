import { user } from "../models/user.js";
import bcrypt from 'bcrypt';
import { userService } from "../services/user.service.js";
import { jwtService } from "../services/jwt.service.js";
import { check, validationResult } from "express-validator";

const register = async (req, res) => {
  const { first_name, last_name, email, phoneNumber, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await user.create({ first_name, last_name, email, phoneNumber, password: hashedPassword });
  res.send(newUser);
}

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.findByEmail(email);

  if (!user) {
    res.sendStatus(401);
    return;
  }

  const isPasswordValid = bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.sendStatus(401);
    return;
  }

  const normalizedUser = userService.normalize(user);
  const accessToken = jwtService.sign(normalizedUser);

  res.send({
    user: normalizedUser,
    accessToken,
  });
}

const getUserById = async (req, res) => {
  const { id } = req.params;
  const foundUser = await userService.findById(id);

  if (!user) {
    res.sendStatus(401);
    return;
  }

  const normFoundUser = userService.normalize(foundUser);

  res.send({
    user: normFoundUser,
  })
}

const updateUser = async (req, res) => {
  const { id } = req.params;

  const { email, first_name, last_name, phoneNumber, password } = req.body;

   await Promise.all([
    check('first_name').optional().isAlpha().withMessage('First name must contain only letters'),
    check('last_name').optional().isAlpha().withMessage('Last name must contain only letters'),
    check('email').optional().isEmail().withMessage('Invalid email format'),
    check('phoneNumber').optional().isNumeric().isLength({ min: 7, max: 15 }).withMessage('Invalid phone format'),
    check('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
   ].map(validation => validation.run(req)));
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const foundUser = await userService.findById(id);

  if (!foundUser) {
    res.sendStatus(404);
    return;
  }

  const updatedUser = await foundUser.update({
    email, first_name, last_name, phoneNumber, password
  });

  const updatedUserNorm = userService.normalize(updatedUser);

  res.send({
    user: updatedUserNorm,
  })
}


export const authController = {
  register,
  login,
  getUserById,
  updateUser
}