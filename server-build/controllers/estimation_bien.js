const { json } = require('d3')
const db = require('../models')

const add = async (req, res) => {
    try {
        const estimation = await db.estimation.build(req.body)
        await estimation.save()
        await estimation.reload()
        res.status(200).json({ data: estimation, message: 'success' })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

const getAll = async (req, res) => {
    try {
        const estimation = await db.estimation.findAll()
        if (estimation.length !== 0) {
            res.status(200).json({ data: estimation, message: 'success' })
        } else {
            res.status(200).json({ message: 'estimation empty' })
        }
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

module.exports = {
    add, getAll
}