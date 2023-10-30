require("dotenv").config();
const { saveGenresToDB } = require("../api");
const { Genre } = require("../db");

const { API_KEY } = process.env;
const url = `https://api.rawg.io/api/genres?key=${API_KEY}`


const getAllGenres = async (req, res) => {
    try {
        const count = await Genre.count();
        if (count === 0) {
            const allGenres = await saveGenresToDB(url);
            return res.status(201).json(allGenres)
        } else {
            const allGenres = await Genre.findAll();
            return res.status(200).json(allGenres);
        }
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }

}

module.exports = {
    getAllGenres
}