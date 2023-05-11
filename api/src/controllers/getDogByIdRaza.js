
const axios = require("axios")
const { API_KEY } = process.env;
const { Dog, Temperaments } = require("../db")


const getDogByIdRaza = async (req, res) => {
    try {
      const { idRaza } = req.params;
      if (isNaN(idRaza)){
        const dogs = await Dog.findOne({
          where: { id: idRaza },
          include: Temperaments
        });
        return res.status(200).json(dogs)
      }
      const { data } = await axios("https://api.thedogapi.com/v1/breeds?api_key="+API_KEY);
      const allDogs = data.map((dog) => {
        return{
            id:dog.id,
            name: dog.name, 
            imagen:dog.image.url,
            altura:dog.height.metric,
            peso:dog.weight.metric,
            tiempoDeVida:dog.life_span,
            temperament:dog.temperament
        }
        })
      const raza = allDogs.find((count) => count.id === Number(idRaza));
      
      res.status(200).json(raza);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };
  
  module.exports = getDogByIdRaza;