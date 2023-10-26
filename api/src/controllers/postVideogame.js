const { Videogame } = require("../db");


const postVideogame = async (req, res) => {
    try {
        const { name, image, platforms, description, released, rating, genres } = req.body;

        if (name && image && platforms && description && released && rating && genres) {

            const newVideogame = await Videogame.create({
                name,
                image,
                platforms,
                description,
                released,
                rating
            })
            await newVideogame.addGenres(genres)
            return res.status(201).json(newVideogame)
        } else {
            throw new Error("There was an error when trying to create the video game")
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    postVideogame
}