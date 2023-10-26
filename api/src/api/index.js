const axios = require("axios");
const iconv = require("iconv-lite");

const { Genre } = require("../db.js")

const saveVideoGamesFromAPI = async (url) => {
    const response = await axios.get(url, {responseType:"arraybuffer"});
    const data = iconv.decode(response.data, "win1252");
    const videogames = JSON.parse(data);
    const videogamesList = videogames.results;

    return videogamesList;
}

const saveGenresToDB = async (url,page = 0) => {
    try {
        const response = await axios.get(url, {responseType:"arraybuffer"});
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
        if(page >= 3){
            saveGenresToDB(genres.nex)
        }

    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    saveVideoGamesFromAPI,
    saveGenresToDB
}