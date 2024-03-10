import express from "express"
import mongoose from "mongoose"
import cors from "cors"

import {
  registerValidation,
  loginValidation,
} from "./validations/userValidations.js"

import checkAuth from "./utils/checkAuth.js"

import {
  UserController,
  CityController,
  RouteController,
} from "./controllers/index.js"

const PORT = 5000
const DB_URL =
  "mongodb+srv://mdyubkov:bJskuCmoBBlhzlnm@cluster.kamatdk.mongodb.net/travel"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Around the world")
})

app.get("/auth/me", checkAuth, UserController.getMe)
app.post("/auth/login", loginValidation, UserController.login)
app.post("/auth/register", registerValidation, UserController.register)

app.get("/cities", checkAuth, CityController.getAll)
app.post("/cities", checkAuth, CityController.create)
app.delete("/cities/:id", checkAuth, CityController.remove)

app.get("/routes", checkAuth, RouteController.getAll)
app.post("/routes", checkAuth, RouteController.create)
app.delete("/routes/:id", checkAuth, RouteController.remove)

const start = async () => {
  try {
    mongoose.connect(DB_URL).then(() => console.log("DB OK"))

    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
