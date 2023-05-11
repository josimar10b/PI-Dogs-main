
const { Temperaments } = require("../db");


const getTemperaments = async (req, res) => {
    
    try {
        const allTemperaments = await Temperaments.findAll()
        res.json(allTemperaments)
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = getTemperaments