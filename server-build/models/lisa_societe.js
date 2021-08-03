"use strict";

const LisaSociete = (Sequelize, sequelize) => {
  const lisaSociete = sequelize.define(
    "lisa_societe",
    {
        name: Sequelize.STRING,             
        form_juri: Sequelize.INTEGER,                   
        capi: Sequelize.STRING, 
        rcs_date: Sequelize.STRING, 
        rcs_num: Sequelize.STRING, 
        siege_address: Sequelize.STRING, 
        siege_city: Sequelize.STRING, 
        siege_code_postal: Sequelize.STRING, 
        siege_pays: Sequelize.STRING, 
        siege_phon_por: Sequelize.STRING, 
        siege_phon_fix: Sequelize.STRING, 
        siege_email: Sequelize.STRING, 
        dir_lastname: Sequelize.STRING, 
        dir_firstname: Sequelize.STRING, 
        dir_qual: Sequelize.STRING, 
        dir_avi_barr: Sequelize.STRING, 
        dir_num_toqu: Sequelize.STRING, 
        dir_phon_por: Sequelize.STRING, 
        dir_phon_fix: Sequelize.STRING, 
        dir_email: Sequelize.STRING, 
        decla_date: Sequelize.DATE 
          
    },
    { freezaTableName: true }
  );

  return lisaSociete;
};

module.exports = { LisaSociete };
