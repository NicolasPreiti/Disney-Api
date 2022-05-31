const addCharRouter = require('express').Router();
const { Characters, Movies, Character_Movie } = require('../../../database/db');


addCharRouter.get('/', async(req, res)=>{

    res.render('modify/characters/add_characters', {
        title: 'Personajes',
        alert: false
    });

});

addCharRouter.post('/', async(req, res)=>{

    const { name, age, weight, history, image } = req.body;
    const id_user = req.token.userValid.id;

    await Characters.create({
        name: name.toLowerCase(),
        age,
        weight,
        history,
        image,
        id_user
    });
    
    res.render('modify/characters/add_characters', {
        title: 'Personajes',

        characters: [],

        //ALERTA
        alert: true,
        alertIcon: 'success',
        alertTitle: 'Añadido',
        alertText: 'Personaje añadido correctamente',
        showConfirmButton: false,
        timer: 1500,
        route: 'modify/characters'
    });
    
});

module.exports = {addCharRouter};