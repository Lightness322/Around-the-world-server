import mongoose from "mongoose"

const { Schema } = mongoose

const userSchema = new Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
})

export default mongoose.model("User", userSchema)
