const db = require('../models')

/**
* @param req
* @param res
* @returns {*}
*/


// db.using in index.js
const addLisaVendeur = async (req, res) => {
    try {
        console.log(req.body);
        const LisaVendeur = await db.lisaVendeur.build(req.body)
        await LisaVendeur.save()
        await LisaVendeur.reload()
        res.json({ 'data': LisaVendeur })
    } catch (error) {
        console.log(error);
    }    
}


const updateLisaVendeurs = async (req, res) => {
    try {
        const LisaVendeur = await db.lisaVendeur.findByPk(req.body.id)
        LisaVendeur.update(req.body)
        if (LisaVendeur === null) {
            console.log('Not found!')
        } else {
            res.json({ 'data': LisaVendeur })
        }
    } catch (error) {
        console.log(error);
    }
    
}


const getAllLisaVendeur = async (req, res) => {
    try {
        const LisaVendeur = await db.lisaVendeur.findAll();
        res.json({ 'data': LisaVendeur });
    } 
    catch (error) {
        console.log(error);
    }    
}


const getByIdLisaVendeur = async (req, res) => { 
    const LisaVendeur = await db.lisaVendeur.findAll({ 
        where: { id: req.body.id }
    });
    // console.log({ 'data': LisaVendeur });
    res.json({ 'data': LisaVendeur })
}


const getByMandatIdLisaVendeur = async (req, res) => { 
    const LisaVendeur = await db.lisaVendeur.findAll({ 
        where: { mandatId: req.body.mandatId }
    });
    res.json({ 'data': LisaVendeur })
}

 
const deleteLisaVendeur = async (req, res) => {
    try {
        if (req.body.id) {
            await db.lisaVendeur.destroy({ where: { id: req.body.id } })
            console.log("try delete ...")
            res.json({ 'message': 'data supprimé' })
        } else {
            res.json({ 'message': 'id deleted not found' })
        }
    } catch (error) {
        res.json({ 'message': `${error}` })
    }
}

module.exports = {
    addLisaVendeur,
    updateLisaVendeurs,
    getAllLisaVendeur,
    getByMandatIdLisaVendeur,
    deleteLisaVendeur,
    getByIdLisaVendeur
    
}