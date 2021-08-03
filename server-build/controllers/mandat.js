const db = require('../models')

/**
* @param req
* @param res
* @returns {*}
*/


// db.using in index.js
const addMandat = async (req, res) => {
    try {
        console.log(req.body);
        const Mandat = await db.mandat.build(req.body)
        await Mandat.save()
        await Mandat.reload()
        res.json({ 'data': Mandat })
    } catch (error) {
        console.log(error);
    }

}


const updateMandats = async (req, res) => {
    try {
        const Mandat = await db.mandat.findByPk(req.body.id)
        Mandat.update(req.body)
        if (Mandat === null) {
            console.log('Not found!')
        } else {
            res.json({ 'data': Mandat })
        }
    } catch (error) {
        console.log(error);
    }

}


const getAllMandat = async (req, res) => {
    try {
        const Mandat = await db.mandat.findAll({
            include: [
                { model: db.mandatSousignee },
                { model: db.mandatSignature },
                { model: db.mandatPromesse },
                { model: db.mandatCommercialisation }
            ]
        });
        res.json({ 'data': Mandat });
    } catch (error) {
        console.log(error);
    }
}


const getByNameMandat = async (req, res) => {
    const Mandat = await db.mandat.findAll({
        where: { first_name: req.body.first_name, last_name: req.body.last_name }
    });
    // console.log({ 'data': Mandat });
    res.json({ 'data': Mandat })
}


const getByIdMandat = async (req, res) => {
    const Mandat = await db.mandat.findAll({
        where: { id: req.body.id },
        include: [
            { model: db.mandatSousignee },
            { model: db.mandatSignature },
            { model: db.mandatPromesse },
            { model: db.mandatCommercialisation },
            { model: db.estimation }
        ]
    })
    res.json({ 'data': Mandat });
}


const deleteMandat = async (req, res) => {
    try {
        if (req.body.id) {
            await db.Mandat.destroy({ where: { id: req.body.id } })
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
    addMandat,
    updateMandats,
    getAllMandat,
    deleteMandat,
    getByNameMandat,
    getByIdMandat

}