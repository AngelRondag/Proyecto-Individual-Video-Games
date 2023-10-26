require("dotenv").config();

const axios = require("axios");
const { Videogame } = require("../db");
const { Op } = require("sequelize")
const { API_KEY } = process.env;


const getVideogameByName = async (req, res) => {
    try {
        const { name } = req.query;
        const url = `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page=1`

        const videogamesDB = await Videogame.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            limit: 15
        });

        const response = await axios.get(url)
        const videogameAPI = response.data;

        const allVideogames = videogamesDB.concat(videogameAPI);

        if (allVideogames.length > 0) {
            return res.status(200).json(allVideogames)
        } else {
            throw new Error('No Results Found, try again with different keywords')
        }
    } catch (error) {
        return res.status(404).json({ error: error.message })
    }
}

module.exports = {
    getVideogameByName
};