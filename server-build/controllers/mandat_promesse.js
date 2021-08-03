const db = require('../models')

/**
* @param req
* @param res
* @returns {*}
*/


// db.using in index.js
const addMandatPromesse = async (req, res) => {
    try {
        console.log(req.body);
        const MandatPromesse = await db.mandatPromesse.build(req.body)
        await MandatPromesse.save()
        await MandatPromesse.reload()
        res.json({ 'data': MandatPromesse })
    } catch (error) {
        console.log(error);
    }    
}


const updateMandatPromesses = async (req, res) => {
    try {
        const MandatPromesse = await db.mandatPromesse.findByPk(req.body.id)
        MandatPromesse.update(req.body)
        if (MandatPromesse === null) {
            console.log('Not found!')
        } else {
            res.json({ 'data': MandatPromesse })
        }
    } catch (error) {
        console.log(error);
    }
    
}


const getAllMandatPromesse = async (req, res) => {
    try {
        const MandatPromesse = await db.mandatPromesse.findAll();
        res.json({ 'data': MandatPromesse });
    } 
    catch (error) {
        console.log(error);
    }    
}


const getByIdMandatPromesse = async (req, res) => { 
    const MandatPromesse = await db.mandatPromesse.findAll({ 
        where: { id: req.body.id }
    });
    // console.log({ 'data': MandatPromesse });
    res.json({ 'data': MandatPromesse })
}

 
const deleteMandatPromesse = async (req, res) => {
    try {
        if (req.body.id) {
            await db.mandatPromesse.destroy({ where: { id: req.body.id } })
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
    addMandatPromesse,
    updateMandatPromesses,
    getAllMandatPromesse,
    deleteMandatPromesse,
    getByIdMandatPromesse
    
}