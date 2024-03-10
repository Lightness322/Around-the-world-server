import mongoose from "mongoose"

const { Schema } = mongoose

const citySchema = new Schema({
  name: String,
  coords: [Number],
  country: String,
  population: Number,
  is_capital: Boolean,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
})

export default mongoose.model("City", citySchema)
