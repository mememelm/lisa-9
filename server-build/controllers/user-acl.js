const db = require('../models')

const get = async (req, res) => {
    try {
        const user = await db.hoomeUsersAcl.findAll({
            include: [db.hoomeRoleUser]
        })
        res.status(200).json({ message: 'success', data: user })
    }
    catch (error) {
        res.status(400).json({ message: error })
    }
}

const update = async (req, res) => {
    try {
        const user = await db.hoomeUsersAcl.findByPk(req.params.user_acl_ID)
        user.update(req.body)
        if (!user) {
            res.status(200).json({ message: 'id_not_found' })
        } else {
            res.status(200).json({ message: 'success', data: user })
        }
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

module.exports = {
    get,
    update
}