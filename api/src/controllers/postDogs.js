const { Dog, Temperaments  } = require("../db")


const postDogs = async (req, res) => {
    try {
        const {  name, altura, peso, tiempoDeVida, imagen, temperaments} = req.body

        if ( !name || !altura || !peso || !tiempoDeVida) {
            return res.status(400).json({msg: "Faltan datos"})
        }
        
        const newDog = await Dog.create ({
            name,
            altura,
            peso,
            tiempoDeVida,
            imagen,
            temperaments
        })

        temperaments.forEach(async e=>{
            const temperamento= await Temperaments.findOne({
                where:{nombre: e}
            })
            if(temperamento) {

                await newDog.addTemperament(temperamento.id)
            }
        })

        res.status(200).json(newDog)

    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

module.exports = postDogs