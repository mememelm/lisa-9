const db = require('../models')

const add = async (req, res) => {
    try {
        const role = await db.hoomeRoleUser.build(req.body)
        await role.save()
        await role.reload()
        res.status(200).json({ message: 'success', data: role })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

const update = async (req, res) => {
    try {
        const role = await db.hoomeRoleUser.findByPk(req.params.role_ID)
        role.update(req.body)
        if (!role) {
            res.status(200).json({ message: 'id_not_found' })
        } else {
            res.status(200).json({ message: 'success', data: role })
        }
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

const get = async (req, res) => {
    try {
        const role = await db.hoomeRoleUser.findAll()
        res.status(200).json({ message: 'success', data: role })
    }
    catch (error) {
        res.status(400).json({ message: error })
    }
}

const getById = async (req, res) => {
    const role = await db.hoomeRoleUser.findByPk(req.params.role_ID)
    if (role) {
        res.status(200).json({ message: 'success', data: role })
    } else {
        res.status(200).json({ message: 'id_not_found' })
    }
}

const destroy = async (req, res) => {
    try {
        if (req.params.role_ID) {
            await db.hoomeRoleUser.destroy({ where: { role_ID: req.params.role_ID } })
            res.status(200).json({ message: 'success' })
        } else {
            res.status(200).json({ message: 'id_not_found' })
        }
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

module.exports = {
    add,
    update,
    get,
    destroy,
    getById
}