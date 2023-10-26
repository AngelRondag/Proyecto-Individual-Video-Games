require("dotenv").config();
const { saveVideoGamesFromAPI } = require("../api");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
const url = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=100&page=1`


const getAllVideogames = async (req, res) => {
    try {
        const videogamesAPI = await saveVideoGamesFromAPI(url);
        const videogamesDB = await Videogame.findAll({
            include: Genre
        });
        return res.status(201).json(videogamesAPI.concat(videogamesDB));

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getAllVideogames
}