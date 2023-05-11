const { API_KEY } = process.env;
const axios = require("axios");
const { Dog, Temperaments } = require("../db");


const getDogsApi = async () => {

        const {data} = await axios("https://api.thedogapi.com/v1/breeds?api_key="+API_KEY);
        const infoApi = data.map((dog) => {
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
       return infoApi
        
}

const getDogsBd = async () => {

        const infoBd = await Dog.findAll({include:[{model:Temperaments, atributes:["nombre"]}]})
        return infoBd
}


const getAllDogs =async (req, res) => {
    const dogsApi = await getDogsApi();
    const dogsBd = await getDogsBd();
    const allDogs = [...dogsApi, ...dogsBd];
    try {
        const { name } = req.query;
        if (!name){
            res.status(200).json(allDogs)
        } else {
            const nameDog = allDogs.filter((dog) => dog.name.toLowerCase().startsWith(name.toLowerCase()));
            res.status(200).json(nameDog);
        }
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

module.exports = getAllDogs