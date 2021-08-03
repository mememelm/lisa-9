const db = require('../models')

// db.using in index.js
const addMandatSignature = async (req, res) => {
    try {
        console.log(req.body);
        const MandatSignature = await db.mandatSignature.build(req.body)
        await MandatSignature.save()
        await MandatSignature.reload()
        res.json({ 'data': MandatSignature })
    } catch (error) {
        console.log(error);
    }
    
}


const updateMandatSignatures = async (req, res) => {
    try {
        const MandatSignature = await db.mandatSignature.findByPk(req.body.id)
        MandatSignature.update(req.body)
        if (MandatSignature === null) {
            console.log('Not found!')
        } else {
            res.json({ 'data': MandatSignature })
        }
    } catch (error) {
        console.log(error);
    }
    
}


const getAllMandatSignature = async (req, res) => {
    try {
        const MandatSignature = await db.mandatSignature.findAll();
        res.json({ 'data': MandatSignature });
    } 
    catch (error) {
        console.log(error);
    }    
}


const getByIdMandatSignature = async (req, res) => { 
    const MandatSignature = await db.mandatSignature.findAll({ 
        where: { id: req.body.id }
    });
    // console.log({ 'data': MandatSignature });
    res.json({ 'data': MandatSignature })
}

 
const deleteMandatSignature = async (req, res) => {
    try {
        if (req.body.id) {
            await db.mandatSignature.destroy({ where: { id: req.body.id } })
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
    addMandatSignature,
    updateMandatSignatures,
    getAllMandatSignature,
    deleteMandatSignature,
    getByIdMandatSignature
    
}