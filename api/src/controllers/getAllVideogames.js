require("dotenv").config();
const { saveVideoGamesFromAPI } = require("../api");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;

const getAllVideogames = async (req, res) => {
    try {
        const pages = 5;
        let allVideogamesAPI = [];
        for (let i = 1; i <= pages; i++) {
            const url = `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`
            const response = await saveVideoGamesFromAPI(url);
            allVideogamesAPI = allVideogamesAPI.concat(response);
        }

        const videogamesDB = await Videogame.findAll({
            include: Genre
        });

        allVideogamesAPI = allVideogamesAPI.concat(videogamesDB)
        return res.status(201).json(allVideogamesAPI)

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


module.exports = {
    getAllVideogames
}