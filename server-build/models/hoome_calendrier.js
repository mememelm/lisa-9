module.exports = (sequelize, type) => {
    return sequelize.define(
        "notification_calendrier",
        {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            destinataire: {
                type: type.STRING,
                allowNull: false,
            },
            expediteur: {
                type: type.STRING,
                allowNull: false,
            },
            date_rendez_vous: {
                type: type.DATE,
                defaultValue: null,
            },
            contenu: {
                type: type.STRING,
                defaultValue: "",
            },
            lu: {
                type: type.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            fait: {
                type: type.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            appointment: {
                type: type.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            status: {
                type: type.STRING,
                defaultValue: "",
            },
            google: {
                type: type.STRING,
                defaultValue: "",
            },
            outlook: {
                type: type.STRING,
                defaultValue: "",
            },
        }
    );
};