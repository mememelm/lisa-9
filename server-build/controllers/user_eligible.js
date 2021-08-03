const db = require('../models')

// db.using in index.js
const addUserEligible = async (req, res) => {
    try {
        console.log(req.body);
        const UserEligible = await db.userEligible.build(req.body)
        await UserEligible.save()
        await UserEligible.reload()
        res.json({ 'data': UserEligible })
    } catch (error) {
        console.log(error);
    }
    
}


const updateUserEligibles = async (req, res) => {
    try {
        const UserEligible = await db.userEligible.findByPk(req.body.id)
        UserEligible.update(req.body)
        if (UserEligible === null) {
            console.log('Not found!')
        } else {
            res.json({ 'data': UserEligible })
        }
    } catch (error) {
        console.log(error);
    }
    
}


const getAllUserEligible = async (req, res) => {
    try {
        const UserEligible = await db.userEligible.findAll(req.body)
        res.json({ 'data': UserEligible })
    } catch (error) {
        console.log(error);
    }    
}


const getByNameUserEligible = async (req, res) => { 
    const UserEligible = await db.userEligible.findAll({ 
        where: { first_name: req.body.first_name, last_name: req.body.last_name }
    });
    // console.log({ 'data': UserEligible });
    res.json({ 'data': UserEligible })
}


const verificationByCodeNumberUserEligible = async (req, res) => { 
    const UserEligible = await db.userEligible.findAll({ 
        where: { phone_number: req.body.phone_number, code_verification: req.body.code_verification }
    });
    res.json({ 'data': UserEligible })
}


// const getByUserUserEligible = async (req, res) => {
//     // const UserEligible = await db.userEligible.findAll({ 
//     //     where: { userId: req.body.userId },
//     //     include: [
//     //         {model: db.UserEligiblesType}
//     //     ]
//     // })
//     // res.json({ 'data': UserEligible })
// }

 
const deleteUserEligible = async (req, res) => {
    try {
        if (req.body.id) {
            await db.userEligible.destroy({ where: { id: req.body.id } })
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
    addUserEligible,
    updateUserEligibles,
    getAllUserEligible,
    deleteUserEligible,
    getByNameUserEligible,
    verificationByCodeNumberUserEligible
    //getByUserUserEligible,
    
}