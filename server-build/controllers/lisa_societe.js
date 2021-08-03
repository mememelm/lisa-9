const db = require('../models')

/**
* @param req
* @param res
* @returns {*}
*/


// db.using in index.js
const addLisaSociete = async (req, res) => {
    try {
        console.log(req.body);
        const LisaSociete = await db.lisaSociete.build(req.body)
        await LisaSociete.save()
        await LisaSociete.reload()
        res.json({ 'data': LisaSociete })
    } catch (error) {
        console.log(error);
    }
    
}


const updateLisaSocietes = async (req, res) => {
    try {
        const LisaSociete = await db.lisaSociete.findByPk(req.body.id)
        LisaSociete.update(req.body)
        if (LisaSociete === null) {
            console.log('Not found!')
        } else {
            res.json({ 'data': LisaSociete })
        }
    } catch (error) {
        console.log(error);
    }
    
}


const getAllLisaSociete = async (req, res) => {
    try {
        const LisaSociete = await db.lisaSociete.findAll();
        res.json({ 'data': LisaSociete });
    } 
    catch (error) {
        console.log(error);
    }    
}


const getByIdLisaSociete = async (req, res) => { 
    const LisaSociete = await db.lisaSociete.findAll({ 
        where: { id: req.body.id }
    });
    // console.log({ 'data': LisaSociete });
    res.json({ 'data': LisaSociete })
}

 
const deleteLisaSociete = async (req, res) => {
    try {
        if (req.body.id) {
            await db.lisaSociete.destroy({ where: { id: req.body.id } })
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
    
    addLisaSociete,
    updateLisaSocietes,
    getAllLisaSociete,
    deleteLisaSociete,
    getByIdLisaSociete
    
}