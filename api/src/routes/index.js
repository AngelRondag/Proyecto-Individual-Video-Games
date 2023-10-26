const { Router } = require('express');
const { getAllVideogames } = require("../controllers/getAllVideogames")
const { getVideogameById } = require("../controllers/getVideogameById")
const { getAllGenres } = require("../controllers/getAllGenres")
const { getVideogameByName } = require("../controllers/getVideogamesByName");
const { postVideogame } = require("../controllers/postVideogame")
const router = Router();

router.get("/videogames", getAllVideogames)
router.get("/videogames/name", getVideogameByName)
router.get("/videogames/:id", getVideogameById)
router.get("/genres", getAllGenres)
router.post("/videogames", postVideogame)


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
