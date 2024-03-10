import City from "../models/City.js"

export const create = async (req, res) => {
  try {
    const doc = new City({
      coords: req.body.coords,
      country: req.body.country,
      is_capital: req.body.is_capital,
      name: req.body.name,
      population: req.body.population,
      user: req.userId,
    })

    const city = await doc.save()

    res.json(city)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Failed to add city",
    })
  }
}

export const getAll = async (req, res) => {
  try {
    const cities = await City.find({ user: req.userId })

    res.json(cities)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Failed to get cities",
    })
  }
}

export const remove = async (req, res) => {
  try {
    const cityId = req.params.id

    await City.findOneAndDelete({
      _id: cityId,
    })

    res.json({
      success: true,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Failed to delete city",
    })
  }
}
