const dbConfig = require("../config/db");

console.log(dbConfig.connectDb.DB)

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.connectDb.DB, dbConfig.connectDb.USER, dbConfig.connectDb.PASSWORD, {
    host: dbConfig.connectDb.HOST,
    dialect: dbConfig.connectDb.dialect,
    operatorsAliases: 0,

    pool: {
        max: dbConfig.connectDb.pool.max,
        min: dbConfig.connectDb.pool.min,
        acquire: dbConfig.connectDb.pool.acquire,
        idle: dbConfig.connectDb.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.hoomeUsersAcl = require('./hoome_user_acl').hoomeUserAcl(sequelize, Sequelize);

db.userEligible = require('./user_eligible').UserEligible(Sequelize, sequelize);
db.mandatSousignee = require('./mandat_sousignee').MandatSousignee(Sequelize, sequelize);
db.mandatSignature = require('./mandat_signature').MandatSignature(Sequelize, sequelize);
db.mandatPromesse = require('./mandat_promesse').MandatPromesse(Sequelize, sequelize);
db.mandatCommercialisation = require('./mandat_commercialisation').MandatCommercialisation(Sequelize, sequelize);
db.lisaSociete = require('./lisa_societe').LisaSociete(Sequelize, sequelize);
db.lisaVendeur = require('./lisa_vendeur').LisaVendeur(Sequelize, sequelize);
db.mandat = require('./mandat').Mandat(Sequelize, sequelize);
db.hoomeRoleUser = require('./hoome_role_user').HoomeRoleUser(Sequelize, sequelize);
db.estimation = require('./estimation_bien').Estimation(Sequelize, sequelize);


// Foreign Key configuration 
db.mandat.belongsTo(db.mandatSousignee, { onDelete: 'cascade' });
db.mandat.belongsTo(db.mandatSignature, { onDelete: 'cascade' });
db.mandat.belongsTo(db.mandatPromesse, { onDelete: 'cascade' });
db.mandat.belongsTo(db.mandatCommercialisation, { onDelete: 'cascade' });
db.mandat.belongsTo(db.hoomeUsersAcl, { onDelete: 'cascade' });
db.mandat.belongsTo(db.estimation, { onDelete: 'cascade' });

db.lisaVendeur.belongsTo(db.mandat, {onDelete: 'cascade'});
db.lisaSociete.belongsTo(db.mandat, {onDelete: 'cascade'});

db.hoomeUsersAcl.belongsTo(db.hoomeRoleUser);


module.exports = db;