import Route from "../models/Route.js"

export const create = async (req, res) => {
  try {
    const doc = new Route({
      lines: req.body.lines,
      markers: req.body.markers,
      user: req.userId,
    })

    const route = await doc.save()

    res.json(route)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Failed to add route",
    })
  }
}

export const getAll = async (req, res) => {
  try {
    const routes = await Route.find({ user: req.userId })

    res.json(routes)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Failed to get routes",
    })
  }
}

export const remove = async (req, res) => {
  try {
    const routeId = req.params.id

    await Route.findOneAndDelete({
      _id: routeId,
    })

    res.json({
      success: true,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Failed to delete route",
    })
  }
}
