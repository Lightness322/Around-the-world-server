import { validationResult } from "express-validator"

import User from "../models/User.js"

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    }

    const password = req.body.password
    const salt = await bcrypt.genSalt(5)
    const hash = await bcrypt.hash(password, salt)

    const doc = new User({
      email: req.body.email,
      name: req.body.name,
      passwordHash: hash,
    })

    const user = await doc.save()

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret",
      { expiresIn: "30d" }
    )

    const { passwordHash, ...userData } = user._doc

    res.json({ ...userData, token })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "A user with this email already exist",
    })
  }
}

export const login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    })

    if (!user) {
      return res.status(404).json({
        message: "Incorrect email or password",
      })
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    )

    if (!isValidPass) {
      return res.status(404).json({
        message: "Incorrect email or password",
      })
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret",
      { expiresIn: "30d" }
    )

    const { passwordHash, ...userData } = user._doc

    res.json({ ...userData, token })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Failed to login",
    })
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId)

    if (!user) {
      return res.status(404).json({
        message: "User is not found",
      })
    }

    const { passwordHash, ...userData } = user._doc

    res.json({ ...userData })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Failed to get user information",
    })
  }
}
