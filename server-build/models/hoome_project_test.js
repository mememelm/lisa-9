module.exports = (sequelize, type) => {
    return sequelize.define('hoome_project_course_test', {
        course_ID: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        sex: {
            type: type.STRING,
            defaultValue: ""
        },
        pregnant: {
            type: type.STRING,
            defaultValue: ""
        },
        house: {
            type: type.STRING,
            defaultValue: ""
        },
        age: {
            type: type.INTEGER,
            defaultValue: 0
        },
        animal: {
            type: type.STRING,
            defaultValue: ""
        },
        id_acl: {
            type: type.INTEGER
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
};