'use-strict'

const Estimation = (Sequelize, sequelize) => {
    return sequelize.define('estimation_bien', {
        state: Sequelize.STRING,
        informations: Sequelize.STRING,
        media_file: Sequelize.STRING,
        visit_card_file: Sequelize.STRING,
        environment: Sequelize.STRING,
        value_notice_file: Sequelize.STRING
    }, { freezaTableName: true })
}

module.exports = { Estimation }