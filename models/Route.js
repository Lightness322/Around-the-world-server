import mongoose from "mongoose"

const { Schema } = mongoose

const routeSchema = new Schema({
  markers: [
    {
      name: String,
      coords: [Number],
      country: String,
      population: Number,
      is_capital: Boolean,
    },
  ],
  lines: [{ from: String, to: String }],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
})

export default mongoose.model("Route", routeSchema)
