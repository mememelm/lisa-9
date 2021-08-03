"use strict";

const LisaVendeur = (Sequelize, sequelize) => {
  const lisaVendeur = sequelize.define(
    "lisa_vendeur",
    {
        type: Sequelize.STRING,
        gender: Sequelize.STRING,   
        firstname: Sequelize.STRING,   
        lastname: Sequelize.STRING,   
        birthday: Sequelize.DATE,                      
        birthplace: Sequelize.STRING,   
        nationality: Sequelize.STRING,   
        locat_address: Sequelize.STRING,   
        locat_city: Sequelize.STRING,   
        locat_code_postal: Sequelize.STRING,   
        locat_country: Sequelize.STRING,   
        phon_port: Sequelize.STRING, 
        phon_fixe: Sequelize.STRING,
        email: Sequelize.STRING  
  
    },
    { freezaTableName: true }
  );

  return lisaVendeur;
};

module.exports = { LisaVendeur };
