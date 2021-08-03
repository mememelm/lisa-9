const db = require('../models')

/**
* @param req
* @param res
* @returns {*}
*/


// db.using in index.js
const addMandatCommercialisation = async (req, res) => {
    try {
        console.log(req.body);
        const MandatCommercialisation = await db.mandatCommercialisation.build(req.body)
        await MandatCommercialisation.save()
        await MandatCommercialisation.reload()
        res.json({ 'data': MandatCommercialisation })
    } catch (error) {
        console.log(error);
    }
    
}


const updateMandatCommercialisations = async (req, res) => {
    try {
        const MandatCommercialisation = await db.mandatCommercialisation.findByPk(req.body.id)
        MandatCommercialisation.update(req.body)
        if (MandatCommercialisation === null) {
            console.log('Not found!')
        } else {
            res.json({ 'data': MandatCommercialisation })
        }
    } catch (error) {
        console.log(error);
    }
    
}


const getAllMandatCommercialisation = async (req, res) => {
    try {
        const MandatCommercialisation = await db.mandatCommercialisation.findAll();
        res.json({ 'data': MandatCommercialisation });
    } 
    catch (error) {
        console.log(error);
    }    
}


const getByIdMandatCommercialisation = async (req, res) => { 
    const MandatCommercialisation = await db.mandatCommercialisation.findAll({ 
        where: { id: req.body.id }
    });
    // console.log({ 'data': MandatCommercialisation });
    res.json({ 'data': MandatCommercialisation })
}

 
const deleteMandatCommercialisation = async (req, res) => {
    try {
        if (req.body.id) {
            await db.mandatCommercialisation.destroy({ where: { id: req.body.id } })
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
    addMandatCommercialisation,
    updateMandatCommercialisations,
    getAllMandatCommercialisation,
    deleteMandatCommercialisation,
    getByIdMandatCommercialisation
    
}