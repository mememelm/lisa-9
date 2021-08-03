const db = require('../models')

/**
* @param req
* @param res
* @returns {*}
*/


// db.using in index.js
const addMandatSousignee = async (req, res) => {
    try {
        console.log(req.body);
        const MandatSousignee = await db.mandatSousignee.build(req.body)
        await MandatSousignee.save()
        await MandatSousignee.reload()
        res.json({ 'data': MandatSousignee })
    } catch (error) {
        console.log(error);
    }
    
}


const updateMandatSousignees = async (req, res) => {
    try {
        const MandatSousignee = await db.mandatSousignee.findByPk(req.body.id)
        MandatSousignee.update(req.body)
        if (MandatSousignee === null) {
            console.log('Not found!')
        } else {
            res.json({ 'data': MandatSousignee })
        }
    } catch (error) {
        console.log(error);
    }
    
}


const getAllMandatSousignee = async (req, res) => {
    try {
        const MandatSousignee = await db.mandatSousignee.findAll();
        res.json({ 'data': MandatSousignee });
    } 
    catch (error) {
        console.log(error);
    }    
}


const getByIdMandatSousignee = async (req, res) => { 
    const MandatSousignee = await db.mandatSousignee.findAll({ 
        where: { id: req.body.id }
    });
    // console.log({ 'data': MandatSousignee });
    res.json({ 'data': MandatSousignee })
}

 
const deleteMandatSousignee = async (req, res) => {
    try {
        if (req.body.id) {
            await db.mandatSousignee.destroy({ where: { id: req.body.id } })
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
    addMandatSousignee,
    updateMandatSousignees,
    getAllMandatSousignee,
    deleteMandatSousignee,
    getByIdMandatSousignee
    
}