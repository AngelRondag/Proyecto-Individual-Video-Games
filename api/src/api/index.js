const axios = require("axios");
const iconv = require("iconv-lite");
const { Genre } = require("../db.js")

const saveVideoGamesFromAPI = async (url) => {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const data = iconv.decode(response.data, "win1252");
    const videogamesAPI = JSON.parse(data);
    return videogamesAPI.results.map(item => ({
        id: item.id,
        name: item.name,
        image: item.background_image,
        genres: item.genres
    }))
}

const saveGenresToDB = async (url) => {
    try {
        const response = await axios.get(url, { responseType: "arraybuffer" });
        const data = iconv.decode(response.data, "win1252");
        const genres = JSON.parse(data);
        const genresList = genres.results;

        for (let i = 0; i < genresList.length; i++) {
            const { name, id } = genresList[i];
            await Genre.create({
                id,
                name,
            });
        }

        const allGenres = await Genre.findAll();
        return allGenres

    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    saveVideoGamesFromAPI,
    saveGenresToDB
}