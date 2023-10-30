require("dotenv").config();

const axios = require("axios");
const { Videogame, Genre } = require("../db")
const { API_KEY } = process.env;

const getVideogameById = async (req, res) => {

    try {
        const { id } = req.params;
        const isUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

        if (isUUID.test(id)) {
            const videogameFoundDB = await Videogame.findByPk(id, {
                include: Genre,
            });
            if (videogameFoundDB) {
                return res.status(200).json(videogameFoundDB);
            } else {
                throw new Error("Video game not found");
            }

        } else {
            const url = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`;
            const response = await axios.get(url);
            const videogameFoundAPI = response.data
            if (videogameFoundAPI.id) {
                const { id, name, background_image, released, rating, description_raw, genres } = videogameFoundAPI
                return res.status(200).json({
                    id,
                    name,
                    released,
                    genres,
                    rating,
                    image: background_image,
                    descriptions: description_raw,
                });
            } else {
                throw new Error("Video game not found")
            }

        }

    } catch (error) {
        return res.status(404).json({ error: error.message })
    }
}

module.exports = {
    getVideogameById
}