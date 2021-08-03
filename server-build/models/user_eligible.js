"use strict";

const UserEligible = (Sequelize, sequelize) => {
  const userEligible = sequelize.define(
    "user_eligible",
    {
      step: Sequelize.STRING,
      first_name: Sequelize.STRING,
      last_name: Sequelize.STRING,
      email: Sequelize.STRING,
      phone_number: Sequelize.STRING,
      code_verification: Sequelize.INTEGER,
      phone_verified: Sequelize.BOOLEAN,
      situation: Sequelize.STRING,
      age: Sequelize.INTEGER,
      enfant: Sequelize.STRING,
      habitation: Sequelize.STRING,
      situation_pro: Sequelize.STRING,
      code_postal: Sequelize.STRING,
      revenu_mois: Sequelize.INTEGER,
      impot_annuel: Sequelize.STRING,
      expert_contact: Sequelize.STRING,
      site: Sequelize.STRING
    },
    { freezaTableName: true }
  );

  return userEligible;
};

module.exports = { UserEligible };
