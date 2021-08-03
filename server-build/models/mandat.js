"use strict";

const Mandat = (Sequelize, sequelize) => {
  const mandat = sequelize.define(
    "mandat",
    {
      nom: Sequelize.STRING,
      prix: Sequelize.STRING,
      date: Sequelize.DATE,
      etape: Sequelize.STRING,
      typeExistSigned: Sequelize.BOOLEAN,
      typeForm: Sequelize.BOOLEAN,
      linkExistSigned: Sequelize.STRING,
      statutSend: Sequelize.BOOLEAN,
      statutCbiValue: Sequelize.BOOLEAN,
      statut1274: Sequelize.STRING,
      statutClient: Sequelize.STRING,
      etapeValide: Sequelize.BOOLEAN,
      commentaire: Sequelize.STRING,
      cbiName: Sequelize.STRING,
      statutAdvValue: Sequelize.BOOLEAN,
      advName: Sequelize.STRING,
      aclName: Sequelize.STRING,
      vclName: Sequelize.STRING
    },
    { freezaTableName: true }
  );

  return mandat;
};

module.exports = { Mandat };
