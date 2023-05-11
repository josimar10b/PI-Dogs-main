const axios = require("axios");
const { Temperaments } = require("../db.js");
const { API_KEY } = process.env;


const getApiData =  async() => {

    try {

        const response = await axios.get("https://api.thedogapi.com/v1/breeds?api_key="+API_KEY);
        const breeds = response.data;
    
        const temperaments = new Set();
          breeds.forEach(breed => {
          breed.temperament?.split(',').forEach(temp => temperaments.add(temp.trim()));
        });
    
        const uniqueTemperaments = [...temperaments];
        const temperamentsToInsert = uniqueTemperaments.map(temp => ({ nombre: temp }));
    
        await Temperaments.bulkCreate(temperamentsToInsert);
        console.log('Temperaments saved successfully!');


      } catch (error) {
        console.error(error);
      }

    }
    getApiData();


module.exports = {getApiData}